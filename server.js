// Express + Mongo Modules and dependencies for project
const express = require('express');
const mongojs = require('mongojs')
const mongoose = require('mongoose');
const path = require('path')
const PORT = process.env.PORT || 3000;


// Define our mongodb info
const db = require('./models');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Connect mongoose with params
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout-tracker', {
    useNewUrlParser: true,
    useFindAndModify: false,
    // Fixes deprecated server discovery and monitoring engine warning
    useUnifiedTopology: true
});

// Index Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// Add exercise page
app.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/exercise.html'));
})

// See generated workout stats
app.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/stats.html'));
})

// Provide all saved workouts
app.get('/api/workouts', (req, res) => {
    db.Workout.find({})
        .then(workoutDB => {
            res.json(workoutDB);
        })
        .catch(err => {
            res.json(err);
        });
});

// Create new workout with user provided {body} info 
app.get("/api/workouts",(req,res)=>{
    db.Workout.find({})
    .then(dbWorkouts => {
        res.json(dbWorkouts);
    })
    .catch(err => {
        res.json(err);
    });
});

// Update workout by provided ID
app.put("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(req.params.id,
        {
            $push: {
                "exercises": req.body
            }
        },
        {
            new: true
        }
    ).then(dbUpdateWorkout => {
        res.json(dbUpdateWorkout);
    })
        .catch(err => {
            res.json(err);
        });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});