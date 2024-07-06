import crypto from "crypto";
import { Payment } from "../models/payment.model.js";
import Razorpay from "razorpay";
import { Appointment } from "../models/appointment.model.js";
import { Doctor } from "../models/doctor.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const instance = new Razorpay({
  key_id: process.env.RAZORPAY_ID_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

const generateMeetLink = async (patientRef, doctorRef, date, startTime) => {
  const sharedIdentifier = `${patientRef}-${doctorRef}`;
  const meetLink = `https://meet.google.com/${sharedIdentifier}`;
  console.log("inside generateMeetLink",meetLink)
  return meetLink;
};

const checkout = asyncHandler(async (req, res) => {
  const options = {
    amount: 20000,
    currency: "INR",
  };
  const order = await instance.orders.create(options);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        success: true,
        order,
      },
      "Order is created successfully"
    )
  );
});

const paymentVerificationAndBookVideoConsult = asyncHandler(
  async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // Retrieve appointmentData from query parameters
    const appointmentDataString = req.query.appointmentData;

    // Decode and parse the appointmentData string back to an object
    const appointmentData = JSON.parse(
      decodeURIComponent(appointmentDataString)
    );
    // console.log("appointment data in paymentVerification", appointmentData);

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Database comes here

      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      const { patientRef, doctorRef, date, timeSlot } = appointmentData;

      const existingAppointment = await Appointment.findOne({
        doctorRef,
        date,
        startTime: timeSlot.startTime,
        appointmentStatus: { $ne: "canceled" }, // Exclude canceled appointments
      });

      if (timeSlot.status !== "Available") {
        throw new ApiError(400, "Selected time slot is not available.");
      }

      if (existingAppointment) {
        throw new ApiError(400, "Appointment collision detected.");
      }

      const appointment = await Appointment.create({
        patientRef,
        doctorRef,
        date,
        startTime: timeSlot.startTime,
        appointmentStatus: "pending",
      });

      // Generate Google Meet link
      const meetLink = await generateMeetLink(
        patientRef,
        doctorRef,
        date,
        timeSlot.startTime
      );

      // const meetLink = "https://meet.google.com/hks-tchs-inh"


      console.log("meet link", meetLink);

      appointment.meetLink = meetLink;

      appointment.save();

      // console.log("meet Link", meetLink);

      // Update the status of the selected time slot to "Booked"
      // Find the doctor by doctorRef
      const doctor = await Doctor.findById(doctorRef);

      if (!doctor) {
        throw new ApiError(500, "Doctor not found");
      }

      // Update the status of the selected time slot to "Booked"
      const updatedTimeSlot = doctor.timeSlots.find(
        (slot) =>
          slot.startTime === timeSlot.startTime &&
          slot.dayOfWeek === timeSlot.dayOfWeek
      );

      if (!updatedTimeSlot) {
        throw new ApiError(500, "Time slot not found");
      }

      updatedTimeSlot.status = "Booked";

      await doctor.save();

      res.redirect(`http://localhost:5173/patient/my-appointment`);
    } else {
      res.status(400).json(
        new ApiResponse(
          400,
          {
            success: false,
          },
          "Video consult Appointment is not booked successfully"
        )
      );
    }
  }
);

const getKey = (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_ID_KEY });

export { checkout, paymentVerificationAndBookVideoConsult, getKey };
