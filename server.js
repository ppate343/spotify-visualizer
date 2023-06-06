const express = require("express");
require('dotenv').config()
const querystring = require('node:querystring');
const axios = require("axios");

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

//this page contains the link to the spotify authorization page
//contains custom url queries that pertain to my specific app
// app.get("/login", (req, res) => {

//     // var state = generateRandomString(16);
//     var scope = 'user-read-private user-read-email';

//     res.send("<a href='https://accounts.spotify.com/authorize?client_id=" +
//         client_id +
//         "&response_type=code&redirect_uri=" + redirect_uri + "&scope=" + scope + ">Sign in</a>"
//     );
// });

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

// app.get('/refresh_token', function (req, res) {

//     var refresh_token = req.query.refresh_token;
//     var authOptions = {
//         url: 'https://accounts.spotify.com/api/token',
//         headers: { 'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')) },
//         form: {
//             grant_type: 'refresh_token',
//             refresh_token: refresh_token
//         },
//         json: true
//     };

//     request.post(authOptions, function (error, response, body) {
//         if (!error && response.statusCode === 200) {
//             var access_token = body.access_token;
//             res.send({
//                 'access_token': access_token
//             });
//         }
//     });
// });


app.listen(8080)
console.log("app running on 8080");