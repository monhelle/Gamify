const Game = require("../models/GameSchema.js")

const gameController = {
    getAllGames: (async (req, res) => {
        const games = await Game.find();

        if(games.length > 0 ) {
            res.status(200).send({msg: "Games found", games:games})

        } else {
            res.status(404).send({msg: "Games not found"})
        }
    }),
    createGame: (async (req, res) => {
        const { title, price, publisher, developer, releaseDate, status, description, shortDescription } = req.body;
        console.log(req.body);
        const game = new Game({
            title,
            price,
            publisher,
            developer,
            releaseDate,
            status, 
            description, 
            shortDescription
        })

        let result = await game.save();
        if(result._id) {
            res.status(201).send({msg: "Successfully create game"})      
        } else {
            res.status(500).send({msg: "Something happened while creating the game"})

        }

    }),
    getGame: (async (req, res) => {
        const { id } = req.params;

        const game = await Game.findById(id);

        console.log(game);

        res.status(200).send({msg: "Game retrieved", game: game})


    }),
    editGame: (async (req, res) => {
        const { id } = req.params;
        const updateContent = req.body; //OBJECT
        
        try {
            const game = await Game.findByIdAndUpdate(id, updateContent);

            console.log(game, "UPDATING GAME");
            res.status(200).send({msg: "Game successfuly updated"})
        } catch (error) {
            console.log(error);
        }

    }),
    deleteGame: (async (req, res) => {
        const { id } = req.params;

        const game = await Game.findByIdAndDelete(id);
        console.log(game);

        res.status(200).send({msg: "Game deleted"})

    })

}

module.exports = gameController;