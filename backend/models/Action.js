const mongoose = require('mongoose')
const Schema = mongoose.Schema

const actionsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  skill: {
    ref: 'skills',
    type: Schema.Types.ObjectId,
    required: true
  }
})

module.exports = mongoose.model('actions', actionsSchema)