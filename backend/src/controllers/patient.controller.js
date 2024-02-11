import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { Patient} from "../models/patient.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefereshTokens = async(patientId) =>{
    try {
        const patient = await Patient.findById(patientId)
        const accessToken = patient.generateAccessToken()
        const refreshToken = patient.generateRefreshToken()

        patient.refreshToken = refreshToken
        await patient.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerPatient = asyncHandler( async (req,res) => {
    const {username, fullName, contactNumber, email, gender, password} = req.body
    // console.log("email: ", email);

    if (
        [username, fullName, contactNumber, email, gender, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedPatient = await Patient.findOne({
        $or: [{ username }, { email }]
    })

    if (existedPatient) {
        throw new ApiError(409, "Patient with email or username already exists")
    }
    //console.log(req.files);

    // multer provides more option in req object whenever we use:
    // req.files
    const avatarLocalPath = req.files?.avatar[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    const patient = await Patient.create({
        fullName,
        contactNumber,
        avatar: avatar.url,
        email,
        gender,
        password,
        username: username.toLowerCase()
    })

    const createdPatient = await Patient.findById(patient._id).select(
        "-password -refreshToken"
    )

    if (!createdPatient) {
        throw new ApiError(500, "Something went wrong while registering the pateint")
    }

    return res.status(201).json(
        new ApiResponse(200, createdPatient, "Patient registered Successfully")
    )

} )

const loginPatient = asyncHandler(async (req, res) =>{
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const {email, password} = req.body
    // console.log(email);

    if (!email) {
        throw new ApiError(400, "email is required")
    }

    const patient = await Patient.findOne({email})

    if (!patient) {
        throw new ApiError(404, "Pateint does not exist")
    }

    const isPasswordValid = await patient.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid patient credentials")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(patient._id)

    const loggedInPatient = await Patient.findById(patient._id).select("-password -refreshToken")

    // cookie mate option set karvani jarur pade, je ak object 6
    // cookie khali server side thi j modified thay sake , frontend side only joie sakay
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInPatient, accessToken, refreshToken
            },
            "Patient logged In Successfully"
        )
    )

})

const logoutPatient = asyncHandler(async(req, res) => {
    await Patient.findByIdAndUpdate(
        req.patient._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Patient logged Out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {

    // if mobile development is used then req.body.refreshToken is required
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const patient = await Patient.findById(decodedToken?._id)
    
        if (!patient) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== patient?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(patient._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})

export {
    registerPatient,
    loginPatient,
    logoutPatient,
    refreshAccessToken
}