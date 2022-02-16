const mongoose = require('mongoose')
const Schema = mongoose.Schema

const scaleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  score: {
    type: Number,
    required: true,
    unique: true
  }
})

module.exports = mongoose.model('scales', scaleSchema)