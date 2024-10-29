const { Topic } = require("../schema/index");

const topicController = {
    getAllTopics: async (req, res) => {
        try {
            const tags = await Topic.findAll({attributes:['id', 'label']});
            res.status(200).json(tags);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }
}

module.exports = topicController