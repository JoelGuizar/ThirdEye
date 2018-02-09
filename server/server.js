const express = require('express');
const app = express();
//heroku can inject underlying node variables
const PORT = process.env.PORT || 3000;
const passport = require('passport');
//passport-google-oauth20 comes with a lot, but we only want the .Strategy property.
const GoogleStrategy = require('passport-google-oauth20').Strategy;

clientID= '150881180895-2a30p8o71k73evvvum9bguurpnpbj6rc.apps.googleusercontent.com'
clientSecret='5duP7mvwzLpGvuIjhJMW_WBK'
//uses a new strategy/protcol instance inside the app
passport.use(new GoogleStrategy())

app.listen(PORT, ()=>{
  console.log(`Listening on PORT ${PORT}`);
})

//passport is a middleware which requires at least 2 libraries always the base 'passport' library
//and also, the correct 'passport strategy' depending on which authentication
//provider youre using (google, facebook, linkedin, etc...). Passport helps expedite
//asking for the code/token and making subsequent requests/oath.
