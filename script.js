const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");

const showAllBtn = document.getElementById("showAll");
const showCompletedBtn = document.getElementById("showCompleted");
const showPendingBtn = document.getElementById("showPending");

let completedTasks = 0;
let tasks = [];

tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let updatedTasks = [];

tasks.forEach(function (savedTask) {

    if (typeof savedTask === "string") {

        updatedTasks.push({
            text: savedTask,
            completed: false
        });

    }
    else {
        updatedTasks.push(savedTask);
    }

});

tasks = updatedTasks
localStorage.setItem("tasks", JSON.stringify(tasks));


function updateCounters() {

    totalCount.textContent = tasks.length;

    completedTasks = 0;

    for (let i = 0; i < tasks.length; i++) {

        if (tasks[i].completed === true) {
            completedTasks++;
        }

    }

    completedCount.textContent = completedTasks;

}


function createTaskElement(task) {

    const li = document.createElement("li");

    const taskSpan = document.createElement("span");
    taskSpan.textContent = task.text;


    if (task.completed === true) {
        taskSpan.style.fontWeight = "bold";
    }

    li.appendChild(taskSpan);



    const completeButton = document.createElement("button");

    completeButton.textContent = "Complete";
    completeButton.className = "complete-btn";

    li.appendChild(completeButton);


    completeButton.addEventListener("click", function () {

        if (task.completed === true) {

            task.completed = false;
            taskSpan.style.fontWeight = "normal";

        }

        else {

            task.completed = true;
            taskSpan.style.fontWeight = "bold";

        }

        localStorage.setItem("tasks", JSON.stringify(tasks));

        updateCounters();

    });


    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    li.appendChild(deleteBtn);


    deleteBtn.addEventListener("click", function () {

        const taskIndex = tasks.indexOf(task);

        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);
        }

        localStorage.setItem("tasks", JSON.stringify(tasks));

        li.remove();

        updateCounters();

    });


    taskList.appendChild(li);

}


tasks.forEach(function (task) {

    createTaskElement(task);

});

updateCounters();


addBtn.addEventListener("click", function () {

    const taskText = taskInput.value.trim();

     if (taskText.length === 0) {
     alert("Please Enter a task");
     return;
    }

    const newTask = {

        text: taskText,
        completed: false

    };

    tasks.push(newTask);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    createTaskElement(newTask);

    updateCounters();

    taskInput.value = "";

});


showAllBtn.addEventListener("click", function () {

    for (let i = 0; i < taskList.children.length; i++) {

        taskList.children[i].style.display = "block";

    }

});


taskInput.addEventListener("keydown" , function(event){
    if(event.key === "Enter"){
        addBtn.click()
    }
})



showCompletedBtn.addEventListener("click", function () {

    for (let i = 0; i < taskList.children.length; i++) {

        if (tasks[i].completed === true) {
            taskList.children[i].style.display = "block";
        }

        else {
            taskList.children[i].style.display = "none";
        }

    }

});

showPendingBtn.addEventListener("click", function () {

    for (let i = 0; i < taskList.children.length; i++) {

        if (tasks[i].completed === false) {

            taskList.children[i].style.display = "block";

        }

        else {

            taskList.children[i].style.display = "none";

        }

    }

});