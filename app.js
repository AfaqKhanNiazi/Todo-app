const listValue = document.querySelector(".todoValue");
const todoLists = document.querySelector(".todoLists");
let todoListValue = [];

// Get todo list from LocalStorage
const getTodoListFromLS = () => {
    const todos = JSON.parse(localStorage.getItem("todoYoutube"));
    return todos ? todos : [];
};

// Add a new todo item to LocalStorage
const addTodoListLocalStorage = (todo) => {
    todoListValue.push(todo);
    localStorage.setItem("todoYoutube", JSON.stringify(todoListValue));
};

// Delete a todo item from LocalStorage
const removeTodoFromLS = (index) => {
    todoListValue.splice(index, 1);  // Remove item at specific index
    localStorage.setItem("todoYoutube", JSON.stringify(todoListValue));
};

// Render the todo list from LocalStorage
const renderTodos = () => {
    todoLists.innerHTML = "";  // Clear the current list
    todoListValue.forEach((todo, index) => {
        const liElement = document.createElement("li");
        liElement.innerHTML = `
            ${todo}
            <button class="deleteBtn" data-index="${index}">❌</button>
        `;
        todoLists.appendChild(liElement);
    });
};

// Add a new todo
const addTodoList = (e) => {
    e.preventDefault();
    let newTodo = listValue.value.trim();
    
    if (newTodo !== "") {  // Ensure todo is not empty
        todoListValue = getTodoListFromLS();  // Fetch existing todos from LS
        addTodoListLocalStorage(newTodo);  // Add new todo to LS
        renderTodos();  // Re-render the todo list
        listValue.value = "";  // Clear input field after adding
    }
};

// Handle deletion of a todo
const handleDelete = (e) => {
    if (e.target.classList.contains("deleteBtn")) {
        const index = e.target.getAttribute("data-index");
        removeTodoFromLS(index);  // Remove todo from LocalStorage
        renderTodos();  // Re-render the todo list
    }
};

// Initial setup: fetch and render todos when page loads
document.addEventListener("DOMContentLoaded", () => {
    todoListValue = getTodoListFromLS();
    renderTodos();
});

// Event listeners
document.querySelector(".btn").addEventListener("click", addTodoList);
todoLists.addEventListener("click", handleDelete);