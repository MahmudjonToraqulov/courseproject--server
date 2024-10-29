const { User, FormField, Topic } = require('../../schema/index')

const userOptions = {
    model: User,
    as: 'form_user',
    attributes: ['id', 'name']
}

const formFieldOptions = {
    model: FormField,
    as: 'form_formField',
    order: [['position', 'ASC']],
    attributes: {
        exclude: ['formId']
    }
}

const topicsOptions = {
    model: Topic,
    as: 'form_topic',
    attributes: ['id', 'label']
}

module.exports.getFormByUserIdOptions = (userId) => {
    return {
        where: {userId},
        order: [['createdAt', 'desc']],
        include: [
            formFieldOptions
        ],
    }
}

module.exports.getAllFormOptions = () => {
    return {
        include: [userOptions],
        attributes: {
            exclude: ['userId']
        }
    };
}

module.exports.getFormByIdOptions = (id) => {
    return {
        where: {id},
        include: [
            formFieldOptions,
            userOptions,
            topicsOptions
        ],
        attributes: {
            exclude: ['userId']
        }
    }
}