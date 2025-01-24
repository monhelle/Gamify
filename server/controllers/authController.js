const User = require("../models/UserSchema.js")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = parseInt(process.env.SALTROUNDS);
const createJwt = require("../utils/createJwt.js");
const createCookie = require("../utils/createCookie.js");


const authController = {
  login: (async (req, res) => {
    // res.send("login")

    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    const role = "user";

    console.log(user);
    let hashedPassword = user.password;
    const isPassword = await bcrypt.compare(password, hashedPassword);
    console.log(isPassword, "isPassword");

    if (isPassword) {
      const jwtToken = createJwt(email, role);

      createCookie(res, jwtToken);

   

      res.status(202).send({ msg: "User found!", user: user });
    } else {
      res.status(404).send({ msg: "User not found" })
    }

  }),
  register: ((req, res) => {
    // res.send("register")
    const { email, password, repeatPassword } = req.body;

    console.log(password, "PASSWORD");
    const role = "user";

    if (password === repeatPassword) {
      bcrypt.hash(password, saltRounds, function (err, hash) {

        if (err) console.log(err, "error");
        console.log(hash, "HASH");
        //when hashing,the user is being created with the hashed password
        const user = new User({
          email: email,
          password: hash,
          role: role
        });
        console.log(user);
        user.save();
        const jwtToken = createJwt(email, role);
        createCookie(res, jwtToken);

        
        res.status(201).send({ msg: "Successfully signed up", user: user });

      })
    } else {
      res.status(500).send({ msg: "Please check your signup" })
    }

  }),

};


module.exports = authController;