const mongoose = require('mongoose')
const Schema = mongoose.Schema

const subsphereSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  sphere: {
    ref: 'spheres',
    type: Schema.Types.ObjectId,
    required: true
  }
})

module.exports = mongoose.model('subspheres', subsphereSchema)