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

//the third option 'callbackURL' we pass into the strategy, is which route we want Google to redirect
//the user to once it finishes the authentication -- usually we direct them to a route
//where we can now use the token from google to use permissions that require auth
//once we specify the callbackURL, we must make the corresponding route in express/node
passport.use(
  new GoogleStrategy(
    //configuration as 1st argument
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      //callbackURL must match the authorized redirect URIs on the google API
      callbackURL: '/auth/google/callback'
    },
    //callback as 2nd argument
    (accessToken, refreshToken, profile)=>{

      //accessToken allows you to do other things like do things with their google account
      console.log('accessToken', accessToken);
      //refreshToken refreshes the accessToken since it expires after a amount of time
      console.log('refreshToken', refreshToken);
      //the profile information from Google.
      console.log('profile:', profile);
    }
  )
)

//instead of just an req/res arrow function, use passport function
//internally the 'GoogleStrategy' has the identifier as the string google
//2nd argument is an obect -- 'scope' key being which permissions we want from google
  //a full list of permissions is on their page

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))

//after passport authentication, when google is passing it back to us,
//we use the Google Strategy -- now we have the code/token available from the initial/earlier request
//once the user comes back to this server from google, we use the Google Strategy
app.get('/auth/google/callback', passport.authenticate('google'))

app.listen(PORT, ()=>{
  console.log(`Listening on PORT ${PORT}`);
})

//passport is a middleware which requires at least 2 libraries always the base 'passport' library
//and also, the correct 'passport strategy' depending on which authentication
//provider youre using (google, facebook, linkedin, etc...). Passport helps expedite
//asking for the code/token and making subsequent requests/oath.
