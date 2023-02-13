import * as express from "express"
import{pay} from "../controllers/payment";
import { visiblepayment } from "../utils/verifyToken";
const Pay=new pay();
const router =express.Router();
router.post("/", visiblepayment,Pay. payment)

export default router;