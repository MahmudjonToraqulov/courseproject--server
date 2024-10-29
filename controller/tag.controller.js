const { Tag } =require("../schema/index");

const tagController = {
    getAllTags: async (req, res) => {
        try {
            const tags = await Tag.findAll({attributes:['id', 'label']});
            res.status(200).json(tags);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    },
    getTagById: async (req, res) => {
        const { id } = req.params;
        try {
            const tag = await Tag.findByPk(id);
            if (!tag) return res.status(404).json({ error: "Tag not found" });
            res.status(200).json(tag);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}

module.exports = tagController