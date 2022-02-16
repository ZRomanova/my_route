const errorHandler = require('../utils/errorHandler')
const Subsphere = require('../models/Subsphere')

module.exports.create = async function(req, res) {
    try {
        const subsphere = await new Subsphere({
            name: req.body.name,
            sphere: req.body.sphere
        }).save()
        res.status(201).json(subsphere)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function(req, res) {
    try {
        const subsphere = await Subsphere.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true}).lean()
        res.status(200).json(subsphere)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getBySphere = async function(req, res) {
    try {
        const subspheres = await Subsphere.find().sort({name: 1}).lean()
        res.status(200).json(subspheres)
    } catch (e) {
        errorHandler(res, e)
    }
}