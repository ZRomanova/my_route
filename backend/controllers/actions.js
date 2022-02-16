const errorHandler = require('../utils/errorHandler')
const Action = require('../models/Action')

module.exports.create = async function(req, res) {
    try {
        const action = await new Action({
            name: req.body.name,
            skill: req.body.skill
        }).save()
        res.status(201).json(action)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function(req, res) {
    try {
        const action = await Action.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true}).lean()
        res.status(200).json(action)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getBySkill = async function(req, res) {
    try {
        const actions = await Action.find().sort({name: 1}).lean()
        res.status(200).json(actions)
    } catch (e) {
        errorHandler(res, e)
    }
}