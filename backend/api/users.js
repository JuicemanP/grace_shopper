const { createUser } = require("../db/user");


const usersRouter = require("express").Router();


usersRouter.post("/register", async (req, res) => {
  
    try {
      const { email,username, password } = req.body;
  
      if (password.length < 8) {
        return res.status(404).send("Password is too short!");
      }
      const user = await createUser({ email,username, password });
      res.send({ user: user });
    } catch (error) {
      res.status(404).send("Username already exists!");
    }
  });

module.exports = usersRouter;
