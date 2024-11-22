import mongoose from 'mongoose'
const { Schema, model } = mongoose

// message scheme definition
const messageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = model('Message', messageSchema)
export default Message
