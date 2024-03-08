import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Appointment } from "../models/appointment.model.js";
import { Doctor } from "../models/doctor.model.js";
import { Patient } from "../models/patient.model.js";

const bookAppointment = asyncHandler(async (req, res) => {
  // Extract appointment details from the request body
  const { patientRef, doctorRef, date, timeSlot } = req.body;

  // Check for existing appointments for the selected date and time slot
  const existingAppointment = await Appointment.findOne({
    doctorRef,
    date,
    startTime: timeSlot.startTime,
    appointmentStatus: { $ne: "canceled" }, // Exclude canceled appointments
  });

  // Check the status of the selected time slot
  if (timeSlot.status !== "Available") {
    throw new ApiError(400, "Selected time slot is not available.");
  }

  // If there's an existing appointment, return an error
  if (existingAppointment) {
    throw new ApiError(400, "Appointment collision detected.");
  }

  // Create a new appointment record
  const appointment = await Appointment.create({
    patientRef,
    doctorRef,
    date,
    startTime: timeSlot.startTime,
    appointmentStatus: "pending",
  });

  const createdAppointment = await Appointment.findById(appointment._id);

  if (!createdAppointment) {
    throw new ApiError(
      500,
      "Something went wrong while creating the appointment"
    );
  }

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

  updatedTimeSlot.status = "Booked"; // Or update according to your business logic

  // Save the updated doctor document
  await doctor.save();

  // Return success response
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        createdAppointment,
        "Appointment booked successfully."
      )
    );
});

const getAppointmentById = asyncHandler(async (req, res) => {
  const patientId = req.patient._id;

  if (!patientId) {
    throw new ApiError(400, "Patient ID must be required");
  }

  const appointments = await Appointment.find({ patientRef: patientId })
    .populate({
      path: "patientRef",
      model: "Patient", // Use string instead of object
      select: "fullName", // Select only the fullName field
    })
    .populate({
      path: "doctorRef",
      model: "Doctor", // Use string instead of object
      select: "fullName", // Select only the fullName field
    });

  if (!appointments || appointments.length === 0) {
    throw new ApiError(404, "Appointments not found for this patient");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, appointments, "Appointments fetched successfully")
    );
});

const getAppointmentByIdForDoctor = asyncHandler(async (req, res) => {
  const doctorId = req.doctor._id;

  if (!doctorId) {
    throw new ApiError(400, "Doctor ID must be required");
  }

  const appointments = await Appointment.find({ doctorRef: doctorId }).populate(
    {
      path: "patientRef",
      model: "Patient",
      select: "fullName",
    }
  );

  if (!appointments || appointments.length === 0) {
    throw new ApiError(404, "Appointments not found for this doctor");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, appointments, "Appointments fetched successfully")
    );
});

const getDayOfWeek = (dayNumber) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[dayNumber];
};

const handleStatusOfAppointment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { appointmentStatus } = req.body;

  const appointment = await Appointment.findByIdAndUpdate(
    id,
    { appointmentStatus },
    { new: true }
  );

  if (!appointment) {
    throw new ApiError(404, "Appointment not found");
  }

  if (appointmentStatus === 'canceled' || appointmentStatus === 'completed') {
    const doctor = await Doctor.findById(appointment.doctorRef);
    if (!doctor) {
      throw new ApiError(404, "Doctor not found");
    }

    // Update corresponding time slot to "Available"
    const timeSlotIndex = doctor.timeSlots.findIndex(slot => 
      slot.dayOfWeek === getDayOfWeek(appointment.date.getDay()) &&
      slot.startTime === appointment.startTime
    );

    if (timeSlotIndex !== -1) {
      doctor.timeSlots[timeSlotIndex].status = "Available";
      await doctor.save();
    }
  }

  return res
    .status(200)
    .json(new ApiResponse(200, appointment, "Appointment update successfully"));
});

export {
  bookAppointment,
  getAppointmentById,
  getAppointmentByIdForDoctor,
  handleStatusOfAppointment,
};
