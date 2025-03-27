import { userModel } from "../models/userModel.js";
import { remedyModel } from "../models/remedyModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const get_All_users = asyncHandler(async (req, res) => {
    try {
        const users = await userModel.find({}).select("-password -refreshToken");
        res.status(200).json({users : users, msg : "all the users fatched successfully", statusCode : 200});
    } catch (error) {
        res.status(500).json({msg : "Internal server error", statusCode : 500})
    }
})



export { get_All_users }