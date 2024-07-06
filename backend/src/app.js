import express from 'express'
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()


app.use(cors({
    origin: [process.env.LOCAL_ORIGIN, process.env.REMOTE_ORIGIN],
    credentials: true
}))

// express json data ne allow karshe
app.use(express.json({limit: "16kb"}))

// express ne keva mate k data url amthi pan avshe
// extended 'ture' means object ni andar object mokli shakay
app.use(express.urlencoded({extended: true, limit: "16kb"}))

// file, images, favicon ne machine par store karava mate
app.use(express.static("public"))

// server mathi user na browser ni cookie ne access and set kari shakay
app.use(cookieParser())

//routes import
import patientRouter from './routes/patient.route.js'
import doctorRouter from './routes/doctor.route.js'
import appointmentRouter from './routes/appointment.route.js'
import paymentRouter from './routes/payment.route.js'

//routes declaration
app.use("/api/v1/patients", patientRouter)
app.use("/api/v1/doctors", doctorRouter)
app.use("/api/v1/appointments", appointmentRouter)
app.use("/api/v1/payments", paymentRouter)

export { app }