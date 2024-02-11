import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { Patient } from "../models/patient.model.js";

// whenever in function object is not used then we use '-' symbol in production level
// e.g. below function res is not used anywhere so we use '-' this symbol
export const verifyJWT = asyncHandler(async(req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const patient = await Patient.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!patient) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.patient = patient;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})