const errorHandler = require('../utils/errorHandler')
const Sphere = require('../models/Sphere')

module.exports.create = async function(req, res) {
    try {
        const sphere = await new Sphere({
            name: req.body.name
        }).save()
        res.status(201).json(sphere)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function(req, res) {
    try {
        const sphere = await Sphere.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true}).lean()
        res.status(200).json(sphere)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getAll = async function(req, res) {
    try {
        const spheres = await Sphere.find().sort({name: 1}).lean()
        res.status(200).json(spheres)
    } catch (e) {
        errorHandler(res, e)
    }
}