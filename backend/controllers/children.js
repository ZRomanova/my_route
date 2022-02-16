const errorHandler = require('../utils/errorHandler')
const Child = require('../models/Child')
const User = require('../models/User')

module.exports.create = async function(req, res) {
    try {
        if (req.user.role.edit_info !== 1 || !req.user.institution.includes(req.body.institution)) 
        res.status(403).send({ message: 'Недостаточно прав для получения ресурса.'})
        const child = await new Child({
            name: req.body.name,
            surname: req.body.surname,
            institution: req.body.institution
        }).save()
        res.status(201).json(child)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function(req, res) {
    try {
        if (req.user.role.edit_info !== 1 || 
        (req.user.role.edit_info > 2 && !req.user.institution.includes(req.body.institution)) ||
        (req.user.role.edit_info > 3 && !req.user.children.includes(req.params.id))
        ) 
        res.status(403).send({ message: 'Недостаточно прав для получения ресурса.'})
        const child = await Child.findOneAndUpdate({_id: req.params.id}, {$set: {
            name: req.body.name,
            surname: req.body.surname,
            institution: req.body.institution
        }}, {new: true}).lean()
        res.status(200).json(child)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getAll = async function(req, res) {
    try {
        q = {}
        if (req.query.institution) {
            q.institution =  req.query.institution
        } 

        if (req.query.name) {
            q.name =  req.query.name
        } 

        if (req.query.surname) {
            q.surname =  req.query.surname
        } 
        const children = await Action
        .find(q)
        .sort({name: 1, surname: 1})
        .skip(+req.query.offset)
        .limit(+req.query.limit)
        .lean()
        res.status(200).json(children)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getMy = async function(req, res) {
    try {
        let children = []
        const user = await User.findOne({_id: req.user.id}, {children: 1}).lean()
        for (let ch of user.children) {
            const child = await Child.findOne({_id: ch}).lean()
            children.push(child)
        }
        res.status(200).json(children)
    } catch (e) {
        errorHandler(res, e)
    }
}