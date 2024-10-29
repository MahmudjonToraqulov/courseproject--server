const commentController = require('../socketController/CommentController');

module.exports.setSocket = (io) => {
    io.on('connection', (socket) => {
        let roomId;
        socket.on('getComments', async (formId) => {
            roomId = formId;
            socket.join(roomId);
            try {
                const comments = await commentController.getCommentsByFormId(formId);
                io.to(roomId).emit('updateComments', comments);
            } catch (error) {
                console.error('Error in refreshComments:', error);
                socket.emit('error', 'Failed to refresh comments');
            }
        });
        socket.on('addComment', async (data) => {
            try {
                await commentController.createComment(data);
                const comments = await commentController.getCommentsByFormId(data.formId);
                io.to(data.formId).emit('updateComments', comments);
            } catch (error) {
                console.error('Error in addComment:', error);
                socket.emit('error', 'Failed to add comment');
            }
        });
    });
};

