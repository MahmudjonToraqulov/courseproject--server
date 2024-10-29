const userDto = (user)=>{
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        blocked: user.blocked
    }
}

module.exports.userDto=userDto