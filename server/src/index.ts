import express from 'express';

const app = express();
const port = 3000;

// health check route
app.get('/', (req, res) => {
  res.status(200).send('OK')
});

// get all chat room mesages
app.get('/messages', (req, res) => {
  res.send('get messages')
})

// post a message to chat room
app.post('/message', (req, res) => {
  res.send('post message')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
