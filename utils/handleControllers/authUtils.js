const {comparePassword} = require("../bcryptPassword");


const handleLoginErrors = async (res, user, password)=>{
    if (!user) {
        res.status(401).json({message: "Invalid credentials", error:"User not found"})
        return true
    }
    if (user.blocked) {
        res.status(400).json({message: "User is blocked"})
        return true
    }
    const isMatch = await comparePassword(password, user.password)
    if (!isMatch){
        res.status(401).json({message: "Invalid credentials", error: "Password mismatch"})
        return true
    }
    return false
}



module.exports = {handleLoginErrors}