const { createUser, getUser } = require("../db/user");

const usersRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

usersRouter.post("/register", async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    if (password.length < 8) {
      return res.status(404).send({ error: "Password is too short!" });
    }
    const user = await createUser({ email, username, password });
    delete user.password;
    const token = jwt.sign(
      { id: user.id, username, admin: user.admin },
      JWT_SECRET
    );
    res.send({ token, user });
  } catch (error) {
    res.status(404).send({ error: "Username already exists!" });
  }
});

usersRouter.post("/login", async (req, res, next) => {
  console.log("logging in!");
  const { username, password } = req.body;

  try {
    const user = await getUser({ username, password });
    if (!user) {
      return res.send({
        message: "There is no user registered ",
      });
    } else {
      const token = jwt.sign(
        { id: user.id, username: user.username, admin: user.admin },
        JWT_SECRET
      );
      return res.send({ message: "You're Logged In!", token, user: user });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/me", async (req, res, next) => {
  try {
    res.send({ user: req.user });
  } catch (error) {
    throw error;
  }
});
module.exports = usersRouter;
