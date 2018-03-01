const passport = require('passport');

//wrapped in a function since app isnt defined, and then running in the server.js
module.exports = (app) => {
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
}
