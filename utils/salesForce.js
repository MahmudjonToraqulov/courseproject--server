const jsforce = require('jsforce');
const dotenv = require('dotenv');
const { User } = require('../schema');
dotenv.config()

const username = process.env.SALESFORCE_USER;
const passwordWithToken = process.env.SALESFORCE_PASSWORD;

const conn = new jsforce.Connection({
    loginUrl: 'https://login.salesforce.com'
});

async function loginToSalesforce(res) {
    try {
        await conn.login(username, passwordWithToken)
        console.log('Successful Logged in -------------------------------------- -------------------------------------- -------------------------------------- --------------------------------------!!');
    } catch (e) {
        res.status(500).send()
        throw new Error(e.message)
    }
}

const addToSalesForce = async(req, res)=>{
    const {name, title, email, phone} = req.body.data;
    if (!conn.accessToken) await loginToSalesforce(res);
    try{
        let contact = await conn.sobject('Contact').create({
            LastName: name,
            Email: email,
            Title: title,
            phone: phone,
            AccountId: '00DJ6000000HkT2',
        });
        return contact
    }
    catch (e) {
        res.status(500).send()
        return false
    }
}

const addSalesForceIdToUserId = async (userId, salesForceId, res)=>{
    try{
        let user = await User.findByPk(userId)
        await user.update({salesforceid: salesForceId})
    }
    catch (e) {
        console.log(e)
        res.status(500).json({error: e})
        throw new Error(e.message)
    }
}

module.exports = addToSalesForce
module.exports.addSaleForceIdToUserId = addSalesForceIdToUserId