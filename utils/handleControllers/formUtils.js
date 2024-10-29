const { Form, FormField } = require("../../schema/index");
const {getFormByIdOptions} = require("../options/formOptions");
const sequelize = require("../../database/connectToDB");

const valuesForUpdate = ['name', 'position', 'type', 'options', 'hidden']
const sequelizeValidationError = 'SequelizeValidationError'

const handleSequelizeValidationErrors = (err, res) => {
    const messages = err.errors.map(err => err.message);
    res.status(400).json({ message: messages[0] });
}

const deleteArrayOfFormFields = async (formData, transaction)=>{
        await FormField.destroy({
            where: {
                id: formData.deletedFields
            },
            transaction
        });
}

const createUpdateFormFields = async (formData, formId, transaction, res)=>{
    let formFields = []
    formData.formFields.map(async (item, index) => {
        formFields.push({...item, position: index+1, formId})
    });
    try{
        await FormField.bulkCreate(formFields, {updateOnDuplicate: valuesForUpdate, transaction})
        return true
    }
    catch (e) {
        res.status(500).json({error:  e.message});
        return false
    }
}

module.exports.findForm = async (res, id)=>{
    try{
        const form = await Form.findOne(getFormByIdOptions(id));
        if (!form) {
            res.status(404).json({message: "Form not found"});
            return false
        }
        return form
    }
    catch (e){
        res.status(500).json({error: e.message});
        return false
    }
}

module.exports.handleCreateForm = async (req, formData, res)=>{
    try{
        if (req.body.imageUrl) formData.imageUrl = req.body.imageUrl;
        const transaction = await sequelize.transaction()
        const form = await Form.create(formData, { transaction });
        const createFormFields = await createUpdateFormFields(formData, form.id, transaction, res)
        if (!createFormFields) return false
        await transaction.commit();
        return form
    }
    catch (e){
        if (e.name === sequelizeValidationError) {
            handleSequelizeValidationErrors(e, res)
            return false
        }
        res.status(500).json({error:  e.message});
        return false
    }
}

module.exports.handleUpdateForm = async (req, formData, res, id)=>{
    try{
        if (req.body.imageUrl) formData.imageUrl = req.body.imageUrl;
        const transaction = await sequelize.transaction()
        if(formData.deletedFields) await deleteArrayOfFormFields(formData, transaction)
        const form = await FormSchema.findByPk(id);
        if (!form) return false;
        console.log(form)
        const updatedForm = await form.update(formData, { transaction });
        const createFormFields = await createUpdateFormFields(formData, formData.id, transaction, res)
        if (!createFormFields) return false
        await transaction.commit();
        return updatedForm
    }
    catch (e){
        console.log(e)
        res.status(500).json({error:  e.message});
        return false
    }
}


