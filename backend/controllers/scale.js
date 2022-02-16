const errorHandler = require('../utils/errorHandler')
const Scale = require('../models/Scale')

module.exports.create = async function(req, res) {
    try {
        const scale = await new Scale({
            name: req.body.name,
            score: req.body.score
        }).save()
        res.status(201).json(scale)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function(req, res) {
    try {
        const scale = await Scale.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true}).lean()
        res.status(200).json(scale)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getAll = async function(req, res) {
    try {
        const scale = await Scale.find().sort({score: -1}).lean()
        res.status(200).json(scale)
    } catch (e) {
        errorHandler(res, e)
    }
}