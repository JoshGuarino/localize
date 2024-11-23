import { Router } from "express";
const router = Router()

// health check route
router.get('/', (req, res) => {
  res.status(200).send('OK')
});

// get all chat room mesages
router.get('/messages', (req, res) => {
  res.send('get messages')
})

// post a message to chat room
router.post('/message', (req, res) => {
  res.send('post message')
})

export default router
