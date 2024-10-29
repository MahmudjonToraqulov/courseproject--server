const {Comment} = require("../schema/index")
const {getAllCommentsOptions} = require("../utils/options/commentOptions")
const renameKeys = require("../utils/createDto");

const commentController = {
    getAllComments: async (req, res)=>{
        try {
            const comments = await Comment.findAll(getAllCommentsOptions());
            const renamedComments = comments.map(item => renameKeys(item, ['comment_user', 'comment_form'], ['user', 'form']))
            res.status(200).json(renamedComments)
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    },
    deleteComment: async (req, res)=>{
        const { id } = req.params;
        try {
            const comment = await Comment.findByPk(id);
            if (!comment) return res.status(404).json({ message: "Comment not found" });
            await comment.destroy();
            res.status(204).send();
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }
}

module.exports=commentController