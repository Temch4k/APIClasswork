const mongoose = require("mongoose"),
    { Schema } = require("mongoose"),
    courseSchema = mongoose.Schema(
        {
            title: {
                type: String,
                required: true,
                unique: true
            },
            description: {
                type: String,
                required: true
            },
            maxStudents: {
                type: Number,
                default: 0,
                min: [0, "Course can not have a negative number of students"]
            },
            cost: {
                type: Number,
                default: 0,
                min: [0, "Cost could not be negative values"]
            }

        },
        {
            timestamps: true
        }
    );
module.exports = mongoose.model("Course", courseSchema);