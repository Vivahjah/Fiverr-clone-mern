import express from "express"
import { verifyToken } from "../middleware/verifyToken.js"
import {getConversations,getSingleConversation,updateConversation,createConversation} from "../controllers/conversation.js"

const router = express.Router()


router.post("/" , verifyToken, createConversation)
router.get("/:id" , verifyToken, getSingleConversation)
router.get("/" ,verifyToken,  getConversations)
router.put("/:id" ,verifyToken,  updateConversation)



export default router