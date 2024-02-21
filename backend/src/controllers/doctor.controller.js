import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Doctor } from "../models/doctor.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const registerDoctor = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    contactNumber,
    gender,
    password,
    speciality,
    eduQualification,
    doctorOption
  } = req.body;
  console.log("doctor: ", req.body);

  if (
    [
      fullName,
      email,
      contactNumber,
      gender,
      password,
      speciality,
      eduQualification,
      doctorOption
    ].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedDoctor = await Doctor.findOne({email});

  if (existedDoctor) {
    throw new ApiError(409, "Doctor with email already exists");
  }

  // multer provides more option in req object whenever we use:
  // req.files

  const avatarLocalPath = req.files?.avatar[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const doctor = await Doctor.create({
    avatar: avatar.url,
    fullName,
    email,
    contactNumber,
    gender,
    password,
    speciality,
    eduQualification,
    doctorOption
  });

  const createdDoctor = await Doctor.findById(doctor._id).select(
    "-password -refreshToken"
  );

  if (!createdDoctor) {
    throw new ApiError(
      500,
      "Something went wrong while registering the doctor"
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, createdDoctor, "Doctor registered Successfully")
    );
});

export { registerDoctor };
