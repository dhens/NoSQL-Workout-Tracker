const express = require('express');
const mongojs = require('mongojs')
const mongoose = require('mongoose');
const path = require('path')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const databaseUrl = 'workout-tracker';
const collections = ['workouts'];
const db = mongojs(databaseUrl, collections);

db.on('error', error => {
    console.log('Database Error: ', error);
});

//load page when user finds us
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/exercise.html'));
})

// have a route to submit to
app.get('/submit', (req, res) => {
    db.workouts.insert(req.body, (error, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(response);
        }
    });
});

// take the response and put it in the db

// find a workout by id


// update a workout by id

// delete a workout by id

// delete all workouts

app.get('')
app.listen(3000, () => {
    console.log("App running on port 3000!");
  });
  