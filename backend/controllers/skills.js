const errorHandler = require('../utils/errorHandler')
const Skill = require('../models/Skill')

module.exports.create = async function(req, res) {
    try {
        const skill = await new Skill({
            name: req.body.name,
            subsphere: req.body.subsphere
        }).save()
        res.status(201).json(skill)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function(req, res) {
    try {
        const skill = await Skill.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true}).lean()
        res.status(200).json(skill)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getBySubsphere = async function(req, res) {
    try {
        const skills = await Skill.find().sort({name: 1}).lean()
        res.status(200).json(skills)
    } catch (e) {
        errorHandler(res, e)
    }
}