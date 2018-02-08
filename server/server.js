const express = require('express');
const app = express();
//heroku can inject underlying node variables
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
})

app.listen(PORT, ()=>{
  console.log(`Listening on PORT ${PORT}`);
})
