const reviewController = {
    createReview: (async (req, res) => {
        const {gameId} = req.params;
        const {comment, recommended, stars} = req.body;

        console.log(req.body);

    }),
    getReviewsByGame: (async (req, res) => {

    }),
    getReviewsByUser: (async (req, res) => {

    }),
    getReview: (async (req, res) => {

    }),
    deleteReview: (async (req, res) => {

    })

}

module.exports = reviewController;