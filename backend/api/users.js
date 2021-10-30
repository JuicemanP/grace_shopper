const { createUser, getAllUsers } = require("../db/user");


const usersRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

usersRouter.post("/register", async (req, res,next) => {
  
    try {
      const { email,username, password } = req.body;
  
      if (password.length < 8) {
        return res.status(404).send({error: "Password is too short!"});
      }
      const user = await createUser({ email,username, password });
      res.send({ user: user });
    } catch (error) {
      res.status(404).send({error:"Username already exists!"});
    }
  });

  usersRouter.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await getAllUsers({ username, password });
   
    const token = jwt.sign({id: user.id, username}, JWT_SECRET)
    console.log(token)
    res.send({username:username, token: token })
  
  });

  usersRouter.get("/me", (req,res,next)=>{
  
    if(req.user){
      return res.send(req.user)
    }
    res.status(401).send("Not logged in!")
  })
module.exports = usersRouter;
