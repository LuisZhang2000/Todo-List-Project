//Selectors
const todoInput = document.querySelector(".todo-input"); 
const todoButton = document.querySelector(".todo-button"); 
const todoList = document.querySelector(".todo-list"); 
const filterOption = document.querySelector(".filter-todo")

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions

function addTodo(event) {
    // Prevent form from submitting
    event.preventDefault();
    // Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.append(newTodo);
    // add todo to localstorage
    saveLocalTodos(todoInput.value);
    //CHECK MARK BUTTON 
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //CHECK trash BUTTON 
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // APPEND TO LIST
    todoList.appendChild(todoDiv);
    // CLEAR Todo INPUT VALUE
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    // DELETE TODO 
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        // Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);     // remove todo from local storage
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    // CHECK MARK
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    // check if we already a saved list of todos
    let todos;
    if (localStorage.getItem("todos") === null) {
        // if we don't have any saved todos yet, make a new array of todos
        todos = [];
    } else {
        // if we already have saved todos, get the saved todos array
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);   // save our new todo to the array
    localStorage.setItem("todos", JSON.stringify(todos));   // save it to local storage
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        // if we don't have any saved todos yet, make a new array of todos
        todos = [];
    } else {
        // if we already have saved todos, get the saved todos array
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        // Todo DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        // Create LI
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.append(newTodo);

        //CHECK MARK BUTTON 
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        //CHECK trash BUTTON 
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        // APPEND TO LIST
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        // if we don't have any saved todos yet, make a new array of todos
        todos = [];
    } else {
        // if we already have saved todos, get the saved todos array
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    // recall that todo is the div (when clicking on check and delete buttons, we are really clicking on the div)
    // the div's children are the box with text, the check button and delete button
    // we want to find the index by getting the inner text, so we get the inner text of the first child of the div 
    const todoIndex = todo.children[0].innerText;
    // splice will remove 1 element at the given todo index from the array
    todos.splice(todos.indexOf(todoIndex), 1);  
    localStorage.setItem("todos", JSON.stringify(todos));
}
