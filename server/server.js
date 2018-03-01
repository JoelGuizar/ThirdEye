const express = require('express');
const app = express();
//since we aren't assigning it to anything, we only need to type require
require('./services/passport');
//same as const authRoutes = require('authroutes'), then calling authRoutes(app)
require('./routes/authRoutes')(app);

//heroku can inject underlying node variables
const PORT = process.env.PORT || 3000;




app.listen(PORT, ()=>{
  console.log(`Listening on PORT ${PORT}`);
})

//passport is a middleware which requires at least 2 libraries always the base 'passport' library
//and also, the correct 'passport strategy' depending on which authentication
//provider youre using (google, facebook, linkedin, etc...). Passport helps expedite
//asking for the code/token and making subsequent requests/oath.
