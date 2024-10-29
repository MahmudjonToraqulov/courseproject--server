const { User } = require("../schema/index");
const {findUserById} = require("../utils/handleControllers/userUtils");

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll({ order: [['id', 'ASC']] });
            res.status(200).json(users)
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    },
    setUserAdmin: async (req, res) => {
        try {
            const user = await findUserById(req, res)
            if (!user) return
            await user.update({role: "admin"});
            res.status(204).json();
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    },
    removeUserAdmin: async (req, res) => {
        try {
            const user = await findUserById(req, res)
            if (!user) return
            await user.update({role: 'user'});
            res.status(204).json();
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    },
    blockUser: async (req, res) => {
        try {
            const user = await findUserById(req, res)
            if (!user) return
            await user.update({blocked: true});
            res.status(204).json();
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    },
    unblockUser: async (req, res) => {
        try {
            const user = await findUserById(req, res)
            if (!user) return
            await user.update({blocked: false});
            res.status(204).json();
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    },
    deleteUser: async (req, res) => {
        try {
            const user = await findUserById(req, res)
            if (!user) return
            await user.destroy();
            res.status(204).json();
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }
}

module.exports = userController;