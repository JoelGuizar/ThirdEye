const passport = require('passport');
//passport-google-oauth20 comes with a lot, but we only want the .Strategy property.
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../../config/keys');

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
