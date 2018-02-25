const express = require('express');
const app = express();
//heroku can inject underlying node variables
const PORT = process.env.PORT || 3000;
const passport = require('passport');
//passport-google-oauth20 comes with a lot, but we only want the .Strategy property.
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');


//uses a new strategy/protcol instance inside the app
//but we need to give configuration to these strategy
//lets pass in the keys/secrets here from keys.js

//the third option we pass into the strategy, is which route we want Google to redirect
//the user to once it finishes the authentication -- usually we direct them to a route
//where we can now use the token from google to use permissions that require auth
passport.use(
  new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret
  })
)

app.listen(PORT, ()=>{
  console.log(`Listening on PORT ${PORT}`);
})

//passport is a middleware which requires at least 2 libraries always the base 'passport' library
//and also, the correct 'passport strategy' depending on which authentication
//provider youre using (google, facebook, linkedin, etc...). Passport helps expedite
//asking for the code/token and making subsequent requests/oath.
