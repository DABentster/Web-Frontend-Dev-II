// Import ToDo object from ToDo.js
import ToDo from './ToDo.js';

//Create ToDolist object
const toDoList = new ToDo('todo');
window.addEventListener('load', () => {
  toDoList.showToDoList();
  toDoList.addFilterListeners();
});

//Add new task when 'Add' button pressed
const addTaskButton = document.getElementById('addTaskButton');
addTaskButton.addEventListener('click', () => {
  toDoList.addTask();
});
addTaskButton.addEventListener('touchend', () => {
  toDoList.addTask();
});

//Enable adding new task item with 'Enter' key in input field
const inputField = document.getElementById('newTask');
inputField.addEventListener('keyup', function(event) {
  if(event.key === 'Enter') {
    addTaskButton.click();
  }
});