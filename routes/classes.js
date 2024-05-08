const express = require('express');
const router = express.Router();
const Class = require('../models/class');
const Student = require('../models/student');
const Attendance = require('../models/attendance');

router.get('/', function(req, res) {
    Class.find({}, function(err, classes) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.render('classes', { classes: classes });
        }
    });
});

router.get('/:id/attendance', function(req, res) {
    Class.findById(req.params.id, function(err, classes) {
        if (err) {
            res.status(500).send(err);
        } else {
            Student.find({ class: req.params.id }, function(err, students) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.render('attendance', { class: classes, students: students });
                }
            });
        }
    });
});

router.post('/:id/attendance', function(req, res) {
    const attendance = new Attendance({
        class: req.params.id,
        student: req.body.student,
        status: req.body.attendance
    });
    attendance.save(function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.redirect('/class');
        }
    });
});

router.get('/:id/edit', function(req, res) {
    Class.findById(req.params.id, function(err, classes) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.render('editClass', { class: classes });
        }
    });
});

router.post('/:id/edit', function(req, res) {
    Class.findByIdAndUpdate(req.params.id, req.body, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.redirect('/class');
        }
    });
});

router.get('/:id/delete', function(req, res) {
    Class.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.redirect('/class');
        }
    });
});

module.exports = router;
