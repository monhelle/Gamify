const jwt = require("jsonwebtoken");
require("dotenv").config();

async function verifyJwt(req, res, next) {
    const jsonwebtoken = req.cookies.jwt;

    console.log(req.cookies, "COOKIES");

    jwt.verify(jsonwebtoken, process.env.SUPERSECRETJWT, ((err, decoded) => {
        if(err) {
            console.log(err);
            res.status(401).send({msg: "user not authenticated"});
            return;
        }

        console.log(decoded);
        req.user = decoded;

    }))
    next();
};


module.exports = verifyJwt;