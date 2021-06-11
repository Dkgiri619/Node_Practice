let addButton = document.querySelector(".add-todo");
let inputText = document.querySelector(".todo-input");
let todoContainer = document.querySelector(".todo-list-container");

inputText.addEventListener("keypress",function(e){
    addTodoItem(e);
});
addButton.addEventListener("click", function(e){addTodoItem(e);});
   
function addTodoItem(e){
    if((e.type=="keypress" && e.code=="Enter") || e.type=="click"){
        //console.log(inputText.value);
        appendTodo(inputText.value);
        inputText.value="";
    }
}

function appendTodo(value){
    /* <div class="todo-item">
            <p class="todo-input">Learn css</p>
            <button class="delete-todo">Delete</button>
        </div> */
    let todoInputDiv = document.createElement("div");
    todoInputDiv.classList.add("todo-item");

    let pTodoTag = document.createElement("p");
    pTodoTag.classList.add("todo-input");
    pTodoTag.textContent = value;

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-todo");
    deleteButton.textContent = "Delete";
    todoInputDiv.append(pTodoTag);
    todoInputDiv.append(deleteButton);
    todoContainer.append(todoInputDiv);
    //let deleteButtonSelected = document.querySelector(".delete-todo");
    deleteButton.addEventListener("click", function(e){
        deleteNode(e);
    });
}

function deleteNode(e){
    e.target.parentNode.remove();
}