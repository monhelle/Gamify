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
        console.log(result, "RESULT TAGS");

        if(result._id) {
            res.status(201).send({msg:"Tag successfully saved"})
        }

        

    }),
    getTag: (async (req, res) => {
        const { id } = req.params;
        let tag = await Tag.findById(id);


        if(tag) {
            res.status(200).send({msg: "Tag found", tag:tag})
        } else {
            res.status(404).send({msg: "No tag found"})
        }

    }),
    updateTag: (async (req, res) => {
        const { id } = req.params;
        const { name } = req.body;

        const tag = await Tag.findByIdAndUpdate(id, {name: name})

        if(tag) {
            res.status(202).send({msg: "Tag successfully updated", tag:tag})
        } else {
            res.status(500).send({msg: "Something happened"})
        }

    }),
    deleteTag: (async (req, res) => {
        const { id } = req.params;
        const tag = await Tag.findByIdAndDelete(id); 

        if(tag) {
            res.status(200).send({msg: "Tag succesfully deleted"})
        } else {
            res.status(500).send({msg: "Something happened"})
        } 
    })
}

module.exports = tagController;