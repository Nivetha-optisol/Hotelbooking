import * as express from "express"
import{pay} from "../controllers/payment";
const Pay=new pay();
const router =express.Router();
router.post("/" ,Pay. payment)

export default router;