const User = require("../models/UserSchema.js")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = parseInt(process.env.SALTROUNDS);
const createJwt = require("../utils/createJwt.js");
const createCookie = require("../utils/createCookie.js");


const authController = {
  login: (async (req, res) => {

    const { email, password } = req.body;

    try {

      const user = await User.findOne({ email: email });
      const role = "user";

      console.log(user);
      let hashedPassword = user.password;
      const isPassword = await bcrypt.compare(password, hashedPassword);
      console.log(isPassword, "isPassword");

      if (isPassword) {
        const jwtToken = createJwt(email, role);

        await createCookie(res, jwtToken);



        res.status(202).send({ msg: "User found!", user: user });
      } else {
        res.status(404).send({ msg: "User not found" })
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: "Internal server error" });
    }


  }),
  register: ((req, res) => {
    // res.send("register")
    const { email, password, repeatPassword } = req.body;

    try {
      console.log(password, "PASSWORD");
      const role = "user";

      if (password === repeatPassword) {
        bcrypt.hash(password, saltRounds, async function (err, hash) {

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
          await createCookie(res, jwtToken);


          res.status(201).send({ msg: "Successfully signed up", user: user });

        })
      } else {
        res.status(500).send({ msg: "Please check your signup" })
      }

    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: "Internal server error" });
    }
  }),

};


module.exports = authController;