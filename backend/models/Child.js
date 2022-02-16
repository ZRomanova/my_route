const mongoose = require('mongoose')
const Schema = mongoose.Schema

const childSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  institution: {
    ref: 'institutions',
    type: Schema.Types.ObjectId
  },
  skills: [{
    skill: {
        ref: 'skills',
        type: Schema.Types.ObjectId
    },
    start_date: Date,
    end_date: Date,
    marks: [{
        date: {
            type: Date,
            default: Date.now
        },        
        action: {
            ref: 'actions',
            type: Schema.Types.ObjectId
        },
        mark: {
            ref: 'scale',
            type: Schema.Types.ObjectId
        },
        photo: String,
        video: String    
    }]
  }]
})

module.exports = mongoose.model('children', childSchema)