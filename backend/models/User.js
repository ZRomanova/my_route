const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    default: 'Новый пользователь'
  },
  institution: {
    ref: 'institutions',
    type: [Schema.Types.ObjectId]
  },
  role: {
    type: {    
      //1 - глобальная, 2 - внутри учреждения, 3 - по своим детям, 4 - никакая
      analytics: Number, 
      primary_form: Number,
      invitations: Number,
      work: Number, 
      edit_info: Number
    },
    default: {
      analytics: 3,
      primary_form: 3,
      invitations: 4,
      work: 3,
      edit_info: 3
    }
  },
  children: {
    ref: 'children',
    type: [Schema.Types.ObjectId]
  },
  photo: String,
  access_status:  Number  // 1 - почта не подтверждена, 2 - подтверждена, активно, 3 - заблокирован
})

module.exports = mongoose.model('users', userSchema)