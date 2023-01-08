import mongoose from "mongoose";

// UserSchema defining the document structure of a user
const semester = new mongoose.Schema({
    courses: Array,
});

const UserSchema = new mongoose.Schema(
    {
        netId: String,
        courseList: Array,
    },
    {
        versionKey: false,
        collection: "Users",
    }
);

// Creates the interface for CRUD operations
const User = mongoose.model("User", UserSchema);

export default User;
