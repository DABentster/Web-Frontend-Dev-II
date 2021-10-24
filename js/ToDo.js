import * as localStorage from './localStorage.js';

let toDoList = null; 

//ToDo list Object class
export default class ToDo {
    constructor(elementID) {
        this.parentElement = document.getElementById(elementID);
        this.LSkey = this.parentElement.id;
    }
    //Add task item to ToDo list
    addTask(){
        const task = document.getElementById('newTask');
        saveToDo(this.LSkey, task);
        this.showToDoList();
    }
    //Toggle task item Complete
    completeTask(taskID) {
        let task = toDoList.findIndex(task => task.id == taskID);
        toDoList[task].completed = !toDoList[task].completed;    
        localStorage.writeToLS(this.LSkey, toDoList);
        document.getElementById(taskID).parentElement.classList.toggle('completed');
    }
    //Remove task item from ToDo list
    removeTask(taskID) {
        let task = toDoList.findIndex(task => task.id == taskID);
        toDoList.splice(task, 1);
        localStorage.writeToLS(this.LSkey, toDoList);
        this.showToDoList();
    }
    //Add event listeners for task actions (complete/remove)
    addTaskListeners() {
        const listTasks = Array.from(this.parentElement.children);
        if (listTasks.length > 0 && listTasks[0].children[0]) {
            listTasks.forEach(task => {
                task.children[0].addEventListener('click', event => {
                    this.completeTask(event.currentTarget.id);
                })
                task.children[2].addEventListener('click', event => {
                    this.removeTask(event.currentTarget.parentElement.children[0].id);
                })
            })
        }
    }
    //Add event listeners for filter button actions
    addFilterListeners() {
        const listFilters = Array.from(document.querySelectorAll('.filter'));
        listFilters.forEach(filter => {
            filter.addEventListener('click', event => {
                for (let task in listFilters){
                    listFilters[task].classList.remove('filter-selected');
                }
                event.currentTarget.classList.add('filter-selected');
                this.filterToDo(event.currentTarget.id);
            })
        })    
    }
    //Filter ToDo list - calls external filterBy() function
    filterToDo(category){
        category = filterBy(category);
        const arrFilter = toDoList.filter(task => {
            if (category != null){
                return task.completed == category;
            }
            else return task;
        })
        renderToDoList(this.parentElement, arrFilter);
        this.addTaskListeners();
    }
    //show ToDo list - calls external renderToDoList() function
    showToDoList() {
        getToDo(this.LSkey);
        renderToDoList(this.parentElement, toDoList);
        if (toDoList != null) {
            this.addTaskListeners();
        }
    }
}
//end ToDo object class

//get ToDo List from local storage
function getToDo(key){
    if (toDoList == null){
        toDoList = [];
        let arrLocal = localStorage.readFromLS(key);
        if(arrLocal != null){
            arrLocal.forEach(task => toDoList.push(task));
        }
    }
    return toDoList;
}

//save ToDo List to local storage
function saveToDo(key, taskContent){
    let taskArr = getToDo(key);
    // generate timestamp as taskID
    let taskID = Date.now();
    //create new ToDo task object if text entered
    if(taskContent && taskContent.value){
        const newTask = {id: taskID, content: taskContent.value, completed: false};
        taskArr.push(newTask);
        localStorage.writeToLS(key,taskArr);
        taskContent.value = '';
    }
    taskContent.focus();
}

//render compleete ToDo list on page and update count
function renderToDoList(parent, list) {
    parent.innerHTML = '';
    if(list != null && list.length > 0){
    list.forEach(taskObject => {
        parent.appendChild(renderSingleTask(taskObject));
    })
    } else {
        const emptyList = document.createElement('li');
        emptyList.innerHTML = `No Tasks Found`
        parent.appendChild(emptyList);
    }
    const taskCounter = document.getElementById('task-counter');
    if (list != null) {
        taskCounter.innerHTML = `(${list.length} tasks found)`;
    } else {
        taskCounter.innerHTML = `0 tasks found`;
    }
}

//render one single ToDo list task on page
function renderSingleTask(task) {
    const singleTask = document.createElement('li');
    task.completed ? singleTask.classList.toggle('completed') : '';
    singleTask.innerHTML = 
        `<input id="${task.id}" name="${task.content}" type="checkbox" value="none" ${task.completed ? 'checked' : ''}>
        <label for="${task.id}">${task.content}</label>
        <div class="remove">X</div>`;
    return singleTask;
}

//filter ToDo list items
function filterBy(category){
    switch(category){
        case 'filter-active':
            category = false;
            break;
        case 'filter-complete':
            category = true;
            break;
        case 'filter-all':
            category = null;
            break;
    }
    return category;
}


