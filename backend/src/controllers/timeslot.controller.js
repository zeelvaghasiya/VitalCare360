import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Doctor } from "../models/doctor.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addTimeSlot = asyncHandler(async (req, res) => {
  const { dayOfWeek, startTime } = req.body;

  if (!dayOfWeek) {
    throw new ApiError(401, "Day Of Week must be required");
  }

  if (!startTime) {
    throw new ApiError(401, "Start Time must be required");
  }

  const doctor = req.doctor;

  doctor.timeSlots.push({ dayOfWeek, startTime });

  await doctor.save();

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { dayOfWeek, startTime },
        "Time slot added successfully"
      )
    );
});

const viewAllTimeSlot = asyncHandler(async (req, res) => {

  const doctor = req.doctor;

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        doctor.timeSlots,
        "Time slot are fetched successfully"
      )
    );
});

const deleteTimeSlot = asyncHandler(async (req, res) => {

  const { slotId } = req.params;

  const doctor = req.doctor

  if (!doctor) {
    throw new ApiError(401, "Doctor not found");
  }

  const slotIndex = doctor.timeSlots.findIndex(slot => slot._id.toString() === slotId);

  if (slotIndex === -1) {
    throw new ApiError(401, "Time slot not found");
  }

  doctor.timeSlots.splice(slotIndex, 1);

  await doctor.save();

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        {},
        "Time slot deleted successfully"
      )
    );

});

export { addTimeSlot, viewAllTimeSlot, deleteTimeSlot};
