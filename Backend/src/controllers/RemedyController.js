import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/Apierror.js";
import { userModel } from "../models/userModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { remedyModel } from "../models/remedyModel.js";

const get_Vr_Remedies = asyncHandler(async (req, res) => {
    try {
        const remedies = await remedyModel.find({
            isVerified: true
        });
        if (!remedies) {
            throw new ApiError(404, "No remedies found");
        }
        res.status(200).json(new ApiResponse(200, remedies, "Remedies fetched successfully"));
    } catch (error) {
        res.status(500).send(`Internal Server Error : ${error}`);
    }
});

const createRemedy = asyncHandler(async (req, res) => {
    try {
        const { title, description, ingredients, steps, ailments, effectiveness, EcommerceUrl } = req.body;
        const { userId } = req.user?._id;
        if (
            [title, description, ingredients, steps, ailments]
                .some((field) => field?.trim() === "")) {
            throw new ApiError(400, "All fields are required");
        }

        const user = await userModel.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const remedy = await remedyModel.create({
            userId,
            title,
            description,
            ingredients,
            steps,
            ailments,
            effectiveness,
            EcommerceUrl
        });
        if(!remedy) {
            throw new ApiError(400, "Failed to create remedy");
        } 
        res.status(201).json(new ApiResponse(201, remedy, "Remedy created successfully"));  
    } catch (error) {
        res.status(500).send(`Internal Server Error : ${error}`);
    }
});

export { get_Vr_Remedies, createRemedy };
