import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Doctor } from "../models/doctor.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefereshTokens = async (doctorId) => {
  try {
    const doctor = await Doctor.findById(doctorId);
    const accessToken = doctor.generateAccessToken();
    const refreshToken = doctor.generateRefreshToken();

    doctor.refreshToken = refreshToken;
    await doctor.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const registerDoctor = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    contactNumber,
    gender,
    password,
    speciality,
    eduQualification,
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
    ].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedDoctor = await Doctor.findOne({ email });

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

const loginDoctor = asyncHandler(async (req, res) => {
  // req body -> data
  // username or email
  // find the user
  // password check
  // access and referesh token
  // send cookie

  const { email, password, user } = req.body;
  // console.log(email);

  if (!email) {
    throw new ApiError(400, "email is required");
  }

  if (!password) {
    throw new ApiError(400, "password is required");
  }

  if (!user) {
    throw new ApiError(400, "user is required");
  }

  if (user === "Doctor") {
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      throw new ApiError(404, "Doctor does not exist");
    }

    const isPasswordValid = await doctor.isPasswordCorrect(password);

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid doctor credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
      doctor._id
    );

    const loggedInDoctor = await Doctor.findById(doctor._id).select(
      "-password -refreshToken"
    );

    // cookie mate option set karvani jarur pade, je ak object 6
    // cookie khali server side thi j modified thay sake , frontend side only joie sakay
    const options = {
      sameSite: "None",
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInDoctor,
            accessToken,
            refreshToken,
          },
          "Doctor logged In Successfully"
        )
      );
  }
});

const logoutDoctor = asyncHandler(async (req, res) => {
  await Doctor.findByIdAndUpdate(
    req.doctor._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    }
  );

  const options = {
    sameSite: "None",
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Doctor logged Out"));
});

const getAllDoctorByCategory = asyncHandler(async (req, res) => {
  const { diagnosis } = req.params;

  const allDoctorByCategory = await Doctor.find({ speciality: diagnosis });

  console.log("allDoctorByCategory", allDoctorByCategory);

  return res
    .status(200)
    .json(
      new ApiResponse(200, allDoctorByCategory, "Doctors fetched successfully")
    );
});

// this is used for appointment purpose : after booked slot fetch new data of doctor
const getDoctorById = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) {
    throw new ApiError(404, "Doctor not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, doctor, "Doctor fetched successfully"));
});

const getCurrentDoctor = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.doctor, "Doctor fetched successfully"));
});

const updateDoctorDetails = asyncHandler(async (req, res) => {
  const { fullName, contactNumber, email, gender, speciality } = req.body;

  const doctor = await Doctor.findByIdAndUpdate(
    req.patient?._id,
    {
      $set: {
        fullName,
        contactNumber,
        email,
        gender,
        speciality,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

const editDoctorInfo = asyncHandler(async (req, res) => {
  const { personalInfo } = req.body;

  console.log(personalInfo);

  const doctor = req.doctor;
  doctor.personalInfo = personalInfo;

  await doctor.save();

  return res
    .status(200)
    .json(
      new ApiResponse(200, doctor, "Add Doctor personal details successfully")
    );
});

export {
  registerDoctor,
  getAllDoctorByCategory,
  loginDoctor,
  logoutDoctor,
  getCurrentDoctor,
  updateDoctorDetails,
  editDoctorInfo,
  getDoctorById,
};
