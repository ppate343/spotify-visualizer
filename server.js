
require('dotenv').config()
const querystring = require('querystring');
const axios = require("axios");

const express = require("express");
const app = express();
const port = 8888;

//importing environment variables 
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI



//generates random string containing numbers and letters 
const generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const stateKey = 'spotify_auth_state';

// app.use(express.static(__dirname + '/public'))

//requesting authorization 
app.get('/login', function (req, res) {

    //optional query params 
    const state = generateRandomString(16);
    //setting cookie with spotify auth state key and state random string value 
    res.cookie(stateKey, state);

    //optional query param: accessing details about current logged in users account and email 
    const scope = "user-read-private user-read-email";

    const queryParams = querystring.stringify({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        state: state,
        scope: scope
    });
    // console.log(queryParams);

    res.redirect('https://accounts.spotify.com/authorize?' + queryParams);

});

//requesting refresh and access tokens; spotify returns access and refresh tokens 
app.get("/callback", async (req, res) => {


    // accessing code parameter 
    const code = req.query.code || null;

    // creating const queryParams = to string paramaters needed for the query 
    const queryParams = querystring.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI,
    })

    // creating authorization parameter from client id and client secret in base 64 format for cross site scripting attack mitigation 
    var authorization = (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'));

    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: queryParams,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + authorization,
        },
    })
        .then(response => {
            if (response.status === 200) {

                //redirecting to react app
                // passing along access token, refresh token and timestams in query params 
                const { access_token, refresh_token, expires_in } = response.data;
                const queryParams = querystring.stringify({
                    access_token,
                    refresh_token,
                    expires_in,
                })
                // console.log(access_token);
                // console.log(token_type);

                //redirecting to react app
                res.redirect('http://localhost:3000?' + queryParams);

                //passing along tokens in query params 

            } else {
                res.redirect(`/?${querystring.stringify({ error: 'invalid_token' })}`);
            }
        })

        .catch(error => {
            res.send(error)
        })

});

//requesting refresh token if token is expired. 
app.get('/refresh_token', function (req, res) {

    const { refresh_token } = req.query;
    const authorization = (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'));

    const queryParams = querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: refresh_token
    })

    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: queryParams,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + authorization,
        },
    })

        .then(response => {
            res.send(response.data)
        })
        .catch(error => {
            res.send(error)
        })
});



// console.log(data);

app.listen(port, () => {
    console.log(`express app listening at http://localhost:${port}`);
})