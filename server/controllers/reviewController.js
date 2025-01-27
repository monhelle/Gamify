const Review = require("../models/ReviewSchema.js");
const Game = require("../models/GameSchema.js");

const reviewController = {
    createReview: (async (req, res) => {
        const { gameId } = req.params;
        const { comment, recommended, stars } = req.body;
        
        try {
            let userId = req.user.id;
            const review = await Review.create({
                user: userId,
                game: gameId,
                comment: comment,
                recommended: recommended,
                stars: stars
            })
            if (review) {
    
                const updateGame = await Game.findByIdAndUpdate(gameId, { $push: { reviews: review._id } })
    
                console.log(updateGame);
    
                res.status(201).send({ msg: "Review successfully created" })
            } else {
                res.status(500).send({ msg: "something bad happened" })
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({msg: "Internal server error"})
        }

  


    }),
    getReviewsByGame: (async (req, res) => {
        const {id} = req.params;

        try {
            const reviews = await Review.find({game: id});

            if(reviews) {
                res.status(200).send({msg: "reviews found", reviews:reviews})
            } else {
                res.status(404).send({msg: "No reviews found", reviews:undefined})
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({msg: "Internal server error"})
        }


    }),
    getReviewsByUser: (async (req, res) => {
        const {id} = req.params;

        try {
            const reviews = await Review.find({user: id});

            if(reviews) {
                res.status(200).send({msg: "reviews found", reviews:reviews})
            } else {
                res.status(404).send({msg: "No reviews found", reviews: undefined})
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({msg: "Internal server error"})
        }
    
    }),
    getReview: (async (req, res) => {
        const { id } = req.params;
        const review = await Review.findById(id);
        try {
            if (review) {
                res.status(200).send({ msg: "Found review", review: review });
            } else {
                res.status(404).send({ msg: "Review not found" })
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({msg: "Internal server error"})
        }

     

    }),
    deleteReview: (async (req, res) => {
        const { id } = req.params;
        
        try {
            await Review.findByIdAndDelete(id);
            res.status(200).send({ msg: "Review deleted" });
        } catch (error) {
            console.log(error);
            res.status(500).send({msg: "Internal server error"})
        }
    
    })

}

module.exports = reviewController;