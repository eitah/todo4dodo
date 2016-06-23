/* eslint-disable new-cap, array-callback-return, no-param-reassign,
 no-underscore-dangle */

import express from 'express';
import Priority from '../models/priority';
import Category from '../models/category';
import Task from '../models/task';
import ViewTask from '../models/viewTask';
// import ObjectID from 'mongodb';
const router = module.exports = express.Router();

router.get('/', (req, res) => {
  Task.find((err, tasksArray) => {
    console.log('startmg find length of', tasksArray.length);
    const priorities = Priority.find();
    const viewTasks = tasksArray.map(t => new ViewTask(t, priorities));
    console.log('viewtasks worked');
    res.render('tasks/index', { viewTasks });
  });
});

router.get('/new', (req, res) => {
  const categories = Category.find();
  const priorities = Priority.find();
  res.render('tasks/new', { categories, priorities });
});

/* create new one */
router.post('/', (req, res) => {
  console.log('the object is', req);
  const myTask = new Task(req.body);
  myTask.save(() => {
    res.redirect('/tasks');
  });
});

router.post('/:id/complete', (req, res) => {
  res.redirect('/tasks');
});

/* delete */
router.post('/:id/delete', (req, res) => {
  Task.findOne({ _id: req.params.id }, (err1, f) => {
    if (err1) console.log('entering the delete', err1.message);
    Task.remove({ _id: f._id }, (err2) => {
      if (err2) console.log('entering the delete', err2.message);
      res.redirect('/tasks');
    });
  });
});

router.get('/:id/edit', (req, res) => {
  res.render('tasks/new');
});

/* update exisiting */
router.post('/:id', (req, res) => {
  res.redirect('/tasks');
});
