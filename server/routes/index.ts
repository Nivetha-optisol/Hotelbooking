import * as express from "express"
var cors = require('cors')

const app:express.Application =express();
app.use(cors())
import authRoute from "../routes/auth"
import usersRoute from "../routes/users"
import hotelsRoute from "../routes/hotels"
import roomsRoute from "../routes/rooms"
import paymentsRoute from "../routes/payment"
app.use("/api/auth" , authRoute);
app.use("/api/users" , usersRoute);
app.use("/api/hotels" , hotelsRoute);
app.use("/api/rooms" , roomsRoute);
app.use("/api/payment"  ,  paymentsRoute)


export default app  ;