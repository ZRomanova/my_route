const mongoose = require('mongoose')
const User = mongoose.model('users')

module.exports = function accessControl(want) {
    return async function(req, res, next) {
        const user = await User.findOne({_id: req.user.id}, {role: 1, access_status: 1});
        if (!user || !user.role || 
            user.role.analytics > want.analytics ||
            user.role.primary_form > want.primary_form ||
            user.role.invitations > want.invitations ||
            user.role.edit_info > want.edit_info ||
            user.role.work > want.work
            ) {
            return res.status(403).send({ message: 'Недостаточно прав для получения ресурса.'});
        }
        if (user.access_status === 3) {
            return res.status(403).send({ message: 'Ваш профиль заблокирован.'});
        }
        next();
    }
}