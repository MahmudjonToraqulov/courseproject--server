const { User, Form } = require('../../schema/index')

const userOptions = {
        model: User,
        as: 'comment_user',
        attributes: ['id', 'name']
}

const formOptions = {
        model: Form,
        as: 'comment_form',
        attributes: ['title', 'id', "userId"]
}


module.exports.getCommentsByFormIdOptions = (formId)=>{
    return {
        where: {formId},
        include: [
            userOptions, formOptions
        ],
        attributes: {
            exclude: ['userId', 'updatedAt']
        }
    }
}

module.exports.getAllCommentsOptions = ()=>{
    return {
        include: [
            userOptions, formOptions
        ],
        attributes: {
            exclude: ['userId', 'updatedAt']
        }
    }
}