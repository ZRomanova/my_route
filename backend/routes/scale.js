const express = require('express')
const passport = require('passport')
const controller = require('../controllers/scale')
const accessControl = require('../middleware/accessСontrol')
const router = express.Router()

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)
router.post('/', passport.authenticate('jwt', {session: false}), accessControl({analytics: 4, primary_form: 4, invitations: 4, edit_info: 1, work: 4}), controller.create)
router.patch('/:id', passport.authenticate('jwt', {session: false}), accessControl({analytics: 4, primary_form: 4, invitations: 4, edit_info: 1, work: 4}), controller.update)

module.exports = router