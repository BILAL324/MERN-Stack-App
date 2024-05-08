const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Class = require('./models/class');
const Teacher = require('./models/teacher');
const Student = require('./models/student');

const classesRouter = require('./routes/class');
const teachersRouter = require('./routes/teacher');
const studentsRouter = require('./routes/student');

app.use('/class', classesRouter);
app.use('/teacher', teachersRouter);
app.use('/student', studentsRouter);


const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
require('./database');

mongoose.connect('mongodb://mongodb://0.0.0.0:27017/attendance_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Add a new class
app.post('/class', (req, res) => {
  const newClass = new Class({
    name: req.body.name
  });

  newClass.save()
    .then(classes => res.json(classes))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new teacher
app.post('/teacher', (req, res) => {
  const newTeacher = new Teacher({
    name: req.body.name,
    qualification: req.body.qualification,
    experience: req.body.experience,
    class: req.body.class
  });

  newTeacher.save()
    .then(teacher => res.json(teacher))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new student
app.post('/student', (req, res) => {
  const newStudent = new Student({
    name: req.body.name,
    class: req.body.class
  });

  newStudent.save()
    .then(student => res.json(student))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Mark student attendance
app.put('/student/:id', (req, res) => {
  Student.findById(req.params.id)
    .then(student => {
      student.attendance = req.body.attendance;

      student.save()
        .then(() => res.json('Student attendance updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
