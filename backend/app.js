const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')

const authRoutes = require('./routes/auth')
const sphereRoutes = require('./routes/spheres')
const actionsRoutes = require('./routes/actions')
const subsphereRoutes = require('./routes/subspheres')
const skillsRoutes = require('./routes/skills')
const scaleRoutes = require('./routes/scale')
const keys = require('./config/keys')

const app = express()

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log(error))

app.use(require('morgan')('dev'))
app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())



app.use('/api/auth', authRoutes)
app.use('/api/subspheres', subsphereRoutes)
app.use('/api/actions', actionsRoutes)
app.use('/api/spheres', sphereRoutes)
app.use('/api/skills', skillsRoutes)
app.use('/api/scale', scaleRoutes)

module.exports = app