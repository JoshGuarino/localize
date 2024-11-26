import { Router } from "express";
import Message from "../models/message";
const router = Router()

// health check route
router.get('/', (_req, res) => {
  res.status(200).send('OK')
});

// get all chat room mesages
router.get('/messages', async (_req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server Error')
  }
})

export default router
