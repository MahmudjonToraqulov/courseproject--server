const { User } = require("../../schema/index");


const findUserById = async (req, res)=>{
    const user = await User.findByPk(req.params.id);
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return null
    }
    return user;
}

module.exports = {findUserById}