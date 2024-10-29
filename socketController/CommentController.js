const { Comment } = require("../schema/")
const {getCommentsByFormIdOptions} = require("../utils/options/commentOptions");
const renameKeys = require("../utils/createDto");



const commentController = {
    getCommentsByFormId: async (formId)=>{
        try {
            const comments = await Comment.findAll(getCommentsByFormIdOptions(formId));
            return comments.map(item => renameKeys(item, ['comment_user', 'comment_form'], ['user', 'form']))
        } catch (e) {
            console.log(e)
            return []
        }
    },
    createComment: async (data)=>{
        try {
            await Comment.create(data);
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = commentController;