const express=require("express")


const {addRoom,getAllRoom,deleteRoomById, joinRoom, quiteRoom, getRoomByBookId}=require("../controllers/room")

const roomRouter=express.Router()

const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

roomRouter.post("/addRoom",authentication,authorization,addRoom)
roomRouter.get("/getAllRoom",authentication,authorization,getAllRoom)
roomRouter.delete("/:id",deleteRoomById),
roomRouter.post("/join/:book_id",joinRoom)
roomRouter.delete("/quite/:book_id",quiteRoom)
roomRouter.get("/room/:book_id",getRoomByBookId)


module.exports=roomRouter