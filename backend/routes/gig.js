import express from "express"
import { verifyToken } from "../middleware/verifyToken.js"
import {createGig,getSingleGig,getGigs,deleteGig} from "../controllers/gig.js"

const router = express.Router()


router.post("/" , verifyToken, createGig)
router.delete("/:id" , verifyToken, deleteGig)
router.get("/:id" ,  getSingleGig)
router.get("/" ,  getGigs)



export default router