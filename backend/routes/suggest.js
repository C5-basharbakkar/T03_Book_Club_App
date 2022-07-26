const express=require("express")


const {addSuggest,getSuggest}=require("../controllers/suggest")
const suggestRouter=express.Router()


suggestRouter.post("/",addSuggest)
suggestRouter.get("/all",getSuggest)


module.exports=suggestRouter