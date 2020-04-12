const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema ({
    exercises: {
        type: {
            type: String,
            trim: true,
            required: "Please enter an exercise type"
        },
        name: {
            type: String,
            trim: true,
            required: "Please enter a name for your workout"            
        },
        weight: {
            type: Number,
            trim: true,
            required: "Please enter a number",
            min: 1
        },
        sets: {
            type: Number,
            trim: true,
            min: 1,
            required: "Please enter number of sets"
        },
        reps: {
            type: Number,
            trim: true,
            min: 1,
            required: "Please enter number of reps"
        },
        duration: {
            type: Number,
            trim: true,
            min: 1,
            required: "Please enter number of minutes"
        },
        distance: {
            type: Number,
            trim: true,
            min: 0.1,
            required: "Please enter distance"
        }
    }
})

const Workout = mongoose.model("Workout", workoutSchema);

module.exports  = Workout;