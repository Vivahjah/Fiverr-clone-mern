import express from "express"
import { verifyToken } from "../middleware/verifyToken.js"
import {createConversation,getSingleConversation,getConversation,updateConversation} from "../controllers/conversation.js"

const router = express.Router()


router.post("/" , verifyToken, createConversation)
router.get("/:id" , verifyToken, getSingleConversation)
router.get("/:id" ,  getConversation)
router.put("/" ,  updateConversation)



export default router