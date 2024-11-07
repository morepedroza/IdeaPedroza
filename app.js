// Variables globales
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Referencias a elementos del DOM
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Cargar tareas guardadas al iniciar
document.addEventListener('DOMContentLoaded', displayTasks);

// Eventos
taskForm.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);

// Función para mostrar todas las tareas
function displayTasks() {
    taskList.innerHTML = ''; // Limpiar lista
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task;
        li.setAttribute('data-index', index);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.classList.add('delete-btn');

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Función para agregar una tarea
function addTask(event) {
    event.preventDefault();
    const newTask = taskInput.value.trim();

    if (newTask !== '') {
        tasks.push(newTask);
        updateLocalStorage();
        displayTasks();
        taskInput.value = ''; // Limpiar el campo de entrada
    }
}

// Función para eliminar una tarea
function removeTask(event) {
    if (event.target.classList.contains('delete-btn')) {
        const index = event.target.parentElement.getAttribute('data-index');
        tasks.splice(index, 1);
        updateLocalStorage();
        displayTasks();
    }
}

// Actualizar Local Storage
function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
