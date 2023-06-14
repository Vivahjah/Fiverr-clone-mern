import express from "express"
import { verifyToken } from "../middleware/verifyToken.js"
import {createGig,getGigs,getGig,deleteGig} from "../controllers/gig.js"

const router = express.Router()


router.post("/" , verifyToken, createGig)
router.delete("/:id" , verifyToken, deleteGig)
router.get("/:id" , verifyToken, getGig)
router.get("/" , verifyToken, getGigs)



export default router