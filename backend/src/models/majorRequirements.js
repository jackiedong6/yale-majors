import mongoose from "mongoose";

// MajorRequirements schema defining the structure of a major requirements document
const majorRequirementsSchema = new mongoose.Schema(
    {
        name: String,
        code: String,
        degree: String,
        prerequisites: Array,
        requirements: Array,
        electives: Array,
        senior: Array,
    },
    {
        versionKey: false,
        collection: "majorRequirements",
    }
);

// Provides interface to the database for CRUD operations
const majorRequirements = mongoose.model(
    "majorRequirements",
    majorRequirementsSchema
);

export default majorRequirements;
