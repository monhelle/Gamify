const Tag = require("../models/TagSchema");


const tagController = {
    getAllTags: (async (req, res) => {

        const tags = await Tag.find();

        if(tags.length > 0) {
            res.status(200).send({msg: "Tags successfully retrieves", tags: tags})
        } else {
            res.status(404).send({msg: "No tags exists"})
        }

    }),
    createTag: (async (req, res) => {
        const {name} = req.body;

        const tag =  new Tag({name});
        const result = await tag.save();

        if(result._id) {
            res.status(201).send({msg:"Tag successfully saved"})
        }

        

    }),
    getTag: ((req, res) => {
        const { id } = req.params;

    }),
    updateTag: ((req, res) => {
        const { id } = req.params;

    }),
    deleteTag: ((req, res) => {
        const { id } = req.params;

    })
}

module.exports = tagController;