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

export default router
