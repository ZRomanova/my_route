const mongoose = require('mongoose')
const Schema = mongoose.Schema

const skillSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  subsphere: {
    ref: 'subspheres',
    type: Schema.Types.ObjectId,
    required: true
  }
})

module.exports = mongoose.model('skills', skillSchema)