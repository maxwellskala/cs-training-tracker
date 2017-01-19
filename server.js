const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 3001));

if (process.env.NODE_ENV === 'production') {
   app.use(express.static('client/build'));
}

app.get('/api/test', (req, res) => {
  res.json({test: "successful"});
});


app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});