const bcrypt = require('bcrypt');

const saltRounds = 10;

const hashPassword = async (password) => {
    try {
        return await bcrypt.hash(password, saltRounds);
    } catch (err) {
        return null;
    }
};

const comparePassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (err) {
        return false;
    }
};

module.exports.hashPassword=hashPassword
module.exports.comparePassword=comparePassword
