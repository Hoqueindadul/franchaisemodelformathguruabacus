import mongoose, { Schema } from "mongoose"

const addBranchSchema = new Schema({
    branchName:{
        type: String,
        required: true
    },
    branchAddress:{
        type: String,
        required: true,
    }
}, {timestamps: true});

const AddBranchModel = mongoose.model("AddBranch", addBranchSchema);
export default AddBranchModel;