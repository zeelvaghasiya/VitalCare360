import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Appointment } from "../models/appointment.model.js";
import { Doctor } from "../models/doctor.model.js";
import { Patient } from "../models/patient.model.js";

const bookAppointment = asyncHandler(async (req, res) => {
  const { patientRef, doctorRef, date, timeSlot } = req.body;

  const existingAppointment = await Appointment.findOne({
    doctorRef,
    date,
    startTime: timeSlot.startTime,
    appointmentStatus: { $ne: "canceled" },
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

  const createdAppointment = await Appointment.findById(appointment._id);

  if (!createdAppointment) {
    throw new ApiError(
      500,
      "Something went wrong while creating the appointment"
    );
  }

  const doctor = await Doctor.findById(doctorRef);

  if (!doctor) {
    throw new ApiError(500, "Doctor not found");
  }

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
      model: "Patient",
      select: "fullName",
    })
    .populate({
      path: "doctorRef",
      model: "Doctor",
      select: "fullName",
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
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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

  if (appointmentStatus === "canceled" || appointmentStatus === "completed") {
    const doctor = await Doctor.findById(appointment.doctorRef);
    if (!doctor) {
      throw new ApiError(404, "Doctor not found");
    }

    const timeSlotIndex = doctor.timeSlots.findIndex(
      (slot) =>
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
