/* eslint-disable new-cap, array-callback-return, no-param-reassign */

import express from 'express';
import Priority from '../models/priority';
import Category from '../models/category';
import Task from '../models/task';
import ViewTask from '../models/viewTask';
const router = module.exports = express.Router();

router.get('/', (req, res) => {
  Task.find((err, tasksArray) => {
    console.log('viewArray', tasksArray);
    const priorities = Priority.find();
    const viewTasks = tasksArray.map(t => new ViewTask(t, priorities));
    console.log('viewtasks', viewTasks);
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

router.post('/:id/delete', (req, res) => {
  res.redirect('/tasks');
});

router.get('/:id/edit', (req, res) => {
  res.render('tasks/new');
});

/* update exisiting */
router.post('/:id', (req, res) => {
  res.redirect('/tasks');
});
