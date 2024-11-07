const {User} = require("../schema/index");
const {userDto} = require("../dto/userDto");
const {hashPassword} = require("../utils/bcryptPassword");
const {handleLoginErrors} = require("../utils/handleControllers/authUtils");
const addToSalesForce = require("../utils/salesForce");
const { addSaleForceIdToUserId } = require("../utils/salesForce");


const authController = {
    login: async(req, res) => {
        const {email, password} = req.body
        try {
            const user = await User.findOne({ where: { email } });
            const loginError = await handleLoginErrors(res, user, password)
            if(loginError) return
            res.status(200).json(userDto(user))
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    },
    register: async(req, res) => {
        const {name, email, password} = req.body
        try{
            const hashedPassword = await hashPassword(password)
            if(!hashedPassword) res.status(500).json({error: "password problems"})
            const user = new User({name, email, password:hashedPassword})
            await user.save()
            res.status(201).json(userDto(user))
        }
        catch (e) {
            res.status(500).json({error: e.message})
        }
    },
    getMe: async(req, res) => {
        try {
            const {id} = req.body
            const user = await User.findByPk(id)
            res.status(200).json(userDto(user))
        }
        catch(e) {
            res.status(500).json({ error: e.message })
        }
    },
    salesforce: async (req, res) => {
        const {userId} = req.body.data
        let contact = await addToSalesForce(req, res)
        if (!contact) return;
        await addSaleForceIdToUserId(userId, contact.id, res)
        res.status(201).json(contact);
    }
}

module.exports = authController;
