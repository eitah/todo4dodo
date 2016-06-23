/* eslint-disable no-underscore-dangle */

function ViewTask(task, priorities) {
  this.id = task._id;
  this.name = task.name;
  this.due = task.due.toLocaleDateString();
  this.priority = priorities.find(p => p.value === task.priority);
  if (task.isComplete) {
    this.priority.color = 'white';
  } else {
    this.priority.color = task.priority.color;
  }
  this.category = task.category;
  this.isComplete = task.isComplete;
  this.createdAt = task.createdAt.toLocaleDateString();
}

module.exports = ViewTask;
