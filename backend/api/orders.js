const { createOrders,getProductById } = require("../db/orders");

const ordersRouter = require("express").Router();

ordersRouter.post("/", async(req,res)=>{
    

    try {
        const { user_id, status}=req.body;
        const newOrder=await createOrders({user_id,status})
        res.send(newOrder) 
    } catch (error) {
        throw(error)
    }
})

ordersRouter.get("/", async(req,res)=>{

    try {
        const orderProducts=await getProductById()
       
        res.send({orderProducts}) 
    } catch (error) {
        throw(error)
    }
})
module.exports = ordersRouter;
