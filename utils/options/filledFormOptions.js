const { User, Form, FilledFormItem } = require('../../schema/index')


const userOptions = {
    model: User,
    as: 'filledForm_user',
    attributes: ['id', 'name']
}

const formOptions = {
    model: Form,
    as: 'filledForm_form',
    attributes: ['title', 'id', 'userId']
}

const filledFormItems= {
    model: FilledFormItem,
    as: 'filledForm_filledFormItem',
}

module.exports.filledFormOptions = (formId) => {
    return {
        where: {formId},
        attributes:{
            exclude: ['userId', 'formId', 'updatedAt']
        },
        include: [userOptions, formOptions]
    }
}

module.exports.getFilledFormByIdOptions = (id) =>{
    return {
        where: {id},
        include: [userOptions, formOptions, filledFormItems],
    }
}

module.exports.getAllFilledForms = () =>{
    return {
        attributes:{
            exclude: ['userId', 'formId', 'updatedAt']
        },
        include: [userOptions, formOptions]
    }
}
