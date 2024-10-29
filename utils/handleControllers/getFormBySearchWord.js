const {Op} = require("sequelize");
const { Comment, FormField, Topic, Form } = require('../../schema/index')
const {getAllFormOptions} = require("../options/formOptions");

const titleDescriptionOptions = (searchWord)=>{
    return {
        where: {
            [Op.or]: [
                { title: { [Op.iLike]: `%${searchWord}%` } },
                { description: { [Op.iLike]: `%${searchWord}%` } }
            ]
        },
        attributes: ['id']
    }
}

const commentOptions = (searchWord)=>{
    return {
        where: {
            comment: { [Op.iLike]: `%${searchWord}%` }
        },
        attributes: ['formId']
    }
}

const formFieldOptions = (searchWord)=>{
    return {
        where: {
            name: { [Op.iLike]: `%${searchWord}%` }
        },
        attributes: ['formId']
    }
}

const topicOptions = (searchWord)=>{
    return {
        where: {
            label: { [Op.iLike]: `%${searchWord}%` }
        },
        attributes: ['id']
    }
}

const formsWithTopicOptions = (topicIds)=>{
    return {
        where: {
            topicId: { [Op.in]: topicIds }
        },
        attributes: ['id']
    }
}

const findInFormTitleDescription = async(res, searchWord, formIds)=>{
    try{
        const forms = await Form.findAll(titleDescriptionOptions(searchWord));
        forms.forEach(form => formIds.add(form.id));
        return true
    }
    catch (e){
        res.status(500).json({ error: e.message });
        return false;
    }
}

const searchFormOptions = (formIds)=>{
    return {
        ...getAllFormOptions(),
        where: {
            id: { [Op.in]: formIds }
        }
    }
}

const findInComments = async(res, searchWord, formIds)=>{
    try{
        const comments = await Comment.findAll(commentOptions(searchWord));
        comments.forEach(comment => formIds.add(comment.formId));
        return true
    }
    catch (e) {
        res.status(500).json({ error: e.message });
        return false;
    }
}

const findInFormFields = async(res, searchWord, formIds)=>{
    try{
        const formFields = await FormField.findAll(formFieldOptions(searchWord));
        formFields.forEach(formField => formIds.add(formField.formId));
        return true
    }
    catch (e) {
        res.status(500).json({ error: e.message });
        return false;
    }
}

const findInTopics = async(res, searchWord, formIds)=>{
    try{
        const topics = await Topic.findAll(topicOptions(searchWord));
        const topicIds = topics.map(topic => topic.id);
        const formsWithTopics = await Form.findAll(formsWithTopicOptions(topicIds));
        formsWithTopics.forEach(form => formIds.add(form.id));
        return true
    }
    catch (e) {
        res.status(500).json({ error: e.message });
        return false;
    }
}


const getFormBySearchWord = async(req, res, searchWord)=>{
    try {
        let formIds = new Set();

        const title_descriptions = await findInFormTitleDescription(res, searchWord, formIds)
        if (title_descriptions===false) return false

        const comments = await findInComments(res, searchWord, formIds)
        if (comments===false) return false

        const formFields = await findInFormFields(res, searchWord, formIds)
        if (formFields===false) return false

        const topics = await findInTopics(res, searchWord, formIds)
        if (topics===false) return false

        formIds = Array.from(formIds);

        const searchForms = await Form.findAll(searchFormOptions(formIds));
        return searchForms;
    } catch (e) {
        res.status(500).json({ error: e.message });
        return false;
    }


}


module.exports = getFormBySearchWord