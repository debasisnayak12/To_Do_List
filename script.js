// Selecting elements
const todoInput = document.getElementById('todoInput');
const todoButton = document.getElementById('todoButton');
const todoContainer = document.querySelector('.todo-container');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let EditTodoId = -1;

todoButton.addEventListener('click',(event)=>{
    event.preventDefault();

    saveTodo();
    addTask();
    localStorage.setItem('todos',JSON.stringify(todos));
});

function saveTodo(){
    let todoValue = todoInput.value;
    // check for todo is empty 
    const isEmpty = todoValue === '';
    // check for duplicate todo
    const isDuplicate = todos.some((todo) => todo.value.toUpperCase() === todoValue.toUpperCase());

    if(isEmpty){
        // alert("Todo is empty! Please Add some To Do list...");     
    }else if(isDuplicate){
        alert("Todo list are Duplicate");
    }else{
        if(EditTodoId >= 0){
            todos = todos.map((todo,index) => ({
                  ...todos,
                  value: index === EditTodoId ? todoValue : todo.value,
               }));
               EditTodoId = -1;
        }else{
            todos.push({
            value : todoValue,
            checked : false,
            color : "#" + Math.floor(Math.random()*16777215).toString(16)
        });
        }
    todoInput.value = '';
    // console.log(todos);
 }
}

function addTask(){
    if(todos.length === 0){
        todoContainer.innerHTML = `
        <div class="emptyContainer">
            <img src="assets/Clipboard.png"/>
            <p>You have no To-do Items As of now</p>
        </div>
        `;
        return;
    }
    // clear element before added task 
    todoContainer.innerHTML = "";
    // added task 
    todos.forEach((todo,index) => {
        todoContainer.innerHTML += `
        <div class="todo-list" id="${index}">
        <span class="material-icons-outlined btn" data-action="check" style="color:${todo.color}">${todo.checked ? 'check_circle' : 'circle'}</span>
        <p class="btn ${todo.checked ? "checked" : ""}" data-action="check">${todo.value}</p>
        <span class="material-icons-outlined btn" data-action="edit"> edit_note </span>
        <span class="material-icons-outlined btn" data-action="delete"> delete </span>
      </div>
      `
    });
}

// add EventListener for all todo list 

todoContainer.addEventListener('click', (event) => {
    // target all element 
    const target = event.target;
    // target the todolist parent element 
    const parentElement = target.parentElement;
    const todoId = Number(parentElement.id);
    // check dataset for action 
    let action = target.dataset.action;
    action === 'check' && checkTodo(todoId);
    action === 'edit' && editTodo(todoId);
    action === 'delete' && deleteTodo(todoId);
});

// check Todo 
function checkTodo(todoId){
    todos = todos.map((todo,index)=>({
        ...todo,
        checked : index == todoId ? !todo.checked : todo.checked,
      }));

      addTask();
    localStorage.setItem('todos',JSON.stringify(todos));

}

//edit todo
function editTodo(todoId){
    todoInput.value = todos[todoId].value;
    todoButton.innerHTML = "Save Change";
    EditTodoId = todoId;
}

// delete todo 
function deleteTodo(todoId){
    todos = todos.filter((todo,index) => index != todoId);
    EditTodoId = -1;

    addTask();
    localStorage.setItem('todos',JSON.stringify(todos));

}