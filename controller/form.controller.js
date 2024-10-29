const { Form, FormField } = require("../schema/index");
const {getAllFormOptions, getFormByUserIdOptions} = require("../utils/options/formOptions");
const {findForm, handleCreateForm, handleUpdateForm} = require("../utils/handleControllers/formUtils");
const renameKeys = require("../utils/createDto");
const getFormBySearchWord = require("../utils/handleControllers/getFormBySearchWord");

const formController = {
    getAllForm: async (req, res) => {
        try {
            const form = await Form.findAll(getAllFormOptions());
            const renamedForm = form.map(form=>renameKeys(form, ['form_user'], ['user']))
            res.status(200).json(renamedForm);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    },

    getFormsBySearchWord: async(req, res)=>{
        const {searchWord} = req.query
        try {
            const form = await getFormBySearchWord(req, res, searchWord);
            if (form===false) return
            const renamedForm = form.map(form=>renameKeys(form, ['form_user'], ['user']))
            res.status(200).json(renamedForm);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    },

    getFormByUserId: async (req, res)=>{
        const {userId} = req.params;
        try {
            const form = await Form.findAll(getFormByUserIdOptions(userId));
            const renamedForm = form.map(item=>renameKeys(item, ['form_formField'], ['formFields']))
            res.status(200).json(renamedForm);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    },

    getFormById: async (req, res) => {
        const {id} = req.params;
        try {
            const form = await findForm(res, id);
            if (!form) return
            let renamedForm = renameKeys(form, ['form_formField', 'form_user', 'form_topic'], ['formFields', 'user', 'topic'])
            res.status(200).json(renamedForm);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    },
    createForm: async (req, res) => {
        const formData = JSON.parse(req.body.formData);
        try {
            const form =  await handleCreateForm(req, formData, res)
            if (!form) return
            res.status(201).json(form);
        } catch (e) {
            res.status(500).json({error: "An error occurred while creating the form: " + e.message});
        }
    },
    updateForm: async (req, res) => {
        const {id} = req.params;
        const formData = JSON.parse(req.body.formData);
        try {
            const UpdateForm = await handleUpdateForm(req, formData, res, id);
            if (!UpdateForm) return
            res.status(200).json(UpdateForm);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    },
    deleteForm: async (req, res) => {
        const {id} = req.params;
        try {
            const form = await findForm(res, id);
            if (!form) return
            await form.destroy();
            res.status(204).json();
        } catch (e) {
            console.log(e)
            res.status(500).json({error: e.message})
        }
    },
    deleteFormField: async (req, res) => {
        const {id} = req.params;
        try {
            const formField = await FormField.findByPk(id)
            if (!formField) return res.status(404).json({message: "Cant find field"});
            await formField.destroy();
            res.status(204).json();
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }
}

module.exports = formController