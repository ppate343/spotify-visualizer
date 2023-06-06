
require('dotenv').config()
const querystring = require('node:querystring');
const axios = require("axios");

const express = require("express");

var client_id = process.env.CLIENT_ID
var client_secret = process.env.CLIENT_SECRET
var redirect_uri = 'http://localhost:8080/profile'

const app = express();

var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

app.use(express.static(__dirname + '/public'))


app.get('/login', function (req, res) {

    var state = generateRandomString(16);
    var scope = 'user-read-private user-read-email';
    var queryParams = querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
    });
    // console.log(queryParams);

    res.redirect('https://accounts.spotify.com/authorize?' + queryParams);

});

app.get("/profile", async (req, res) => {
    // console.log("spotify response code" + req.query.code);
    res.send("profile page");

    var queryParams = querystring.stringify({
        grant_type: "authorization_code",
        code: req.query.code,
        redirect_uri: redirect_uri,
    })
    var authorization = (new Buffer.from(client_id + ':' + client_secret).toString('base64'));

    console.log(authorization);

    const spotifyResponse = await axios.post(
        "https://accounts.spotify.com/api/token", queryParams, {
        headers: {
            Authorization: "Basic " + authorization,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        json: true
    }
    )


    console.log(spotifyResponse.data)
});


app.listen(8080)
console.log("app running on 8080");