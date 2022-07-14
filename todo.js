const form=document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");

const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();



function eventListeners()
{
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}


function clearAllTodos(e)
{
    if(confirm("Are you sure?.."))
    {
        while(todoList.firstElementChild != null)
        {
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}

function filterTodos(e)
{
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem)
    {
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1)
        {
            listItem.setAttribute("style","display : none !important");
        }
        else
        {
            listItem.setAttribute("style","display : block");
        }
    })

}


function deleteTodo(e)
{
    if(e.target.className == "fa fa-remove")
    {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","deleted!..");
    }
}


function deleteTodoFromStorage(deletedtodo)
{
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index)
    {
        if(todo === deletedtodo)
        {
            todos.splice(index,1);
        }
    });

    localStorage.setItem("todos",JSON.stringify(todos));
}


function loadAllTodosToUI()
{
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}



function addTodo(e)
{
    const newTodo = todoInput.value.trim();

    if(newTodo === "")
    {
        showAlert("danger","Please fill the blank!..");
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","Created!..")
    }

    e.preventDefault();
}



function getTodosFromStorage()  //storagedan todoları alıcak
{
    let todos;

    if(localStorage.getItem("todos") === null)
    {
        todos = []
    }
    else
    {
        //arraye çevirmemiz gerek
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    return todos;
}



function addTodoToStorage(newTodo)
{
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));
}



function showAlert(type, message)
{
    const alert = document.createElement("div");
    
    alert.className = `alert alert-${type}`;

    alert.textContent = message;

    //console.log(alert);

    firstCardBody.appendChild(alert);

    //set timeout

    setTimeout(function(){
        alert.remove();
    },1000);
}


function addTodoToUI(newTodo)
{
    //list oluşturma
    const listItem = document.createElement("li");
    //link oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class='fa fa-remove'></i>";
    
    listItem.className = "list-group-item d-flex justify-content-between";


    // text node ekleme
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    //to do liste list item ekleme
    todoList.appendChild(listItem);
    todoInput.value = "";
    
}