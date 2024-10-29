const { FilledForm, FilledFormItem } = require("../../schema/index");
const sequelize = require("../../database/connectToDB");
const valuesForUpdate = ['question', 'answer']

const createUpdateFilledFormItems = async (items, filledFormId, transaction, res)=>{
    console.log(items)
    let myItems = []
    items.map((item) => {
        myItems.push({...item, filledFormId})
    });
    try{
        await FilledFormItem.bulkCreate(myItems, {updateOnDuplicate: valuesForUpdate,transaction})
        return true
    }
    catch (e) {
        res.status(500).json({error:  e.message});
        return false
    }
}

module.exports.createFilledForm=async (req, res)=>{
    try{
        const transaction = await sequelize.transaction()
        const filledForm = await FilledForm.create(req.body.data);
        await createUpdateFilledFormItems(req.body.data.items, filledForm.id, transaction, res)
        if (!createUpdateFilledFormItems) return false;
        await transaction.commit();
        return filledForm.id
    }
    catch (e){
        res.status(500).json({error: e.message});
        return false
    }
}