const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3002;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Create new restaurant 
app.post('/restaurants', (req, res) => {
  res.send({
    id: 3,
    name: 'New restaurant',
  });
});

// Get all restaurants
app.get('/restaurants', (req, res) => {
  res.send({
    collection: [
      {
        id: 1,
        name: 'Endiro Coffee',
      },
      {
        id: 2,
        name: 'Java House',
      },
    ],
  })
});

// Get restaurant with :id
app.get('/restaurants/:id', (req, res) => {
  res.send({
    id: 1,
    name: 'Endiro Coffee',
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
