const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const taskTitle = document.getElementById('task-title');
const taskDescription = document.getElementById('task-description');
const dueDate = document.getElementById('due-date');
const sortSelect = document.getElementById('sort-select');
const taskFilter = document.getElementById('task-filter');

let tasks = [];

// Function to add a new task
function addTask(title, description, dueDate) {
    const task = {
        id: Date.now(),
        title,
        description,
        dueDate,
        completed: false,
    };
    tasks.push(task);
    displayTasks();
    taskForm.reset();
}

// Function to edit a task
function editTask(task) {
    const newTitle = prompt('Edit Task Title:', task.title);
    const newDescription = prompt('Edit Task Description:', task.description);
    const newDueDate = prompt('Edit Due Date:', task.dueDate);

    if (newTitle !== null && newDescription !== null && newDueDate !== null) {
        task.title = newTitle;
        task.description = newDescription;
        task.dueDate = newDueDate;
        displayTasks();
    }
}

// Function to display tasks
function displayTasks() {
    taskList.innerHTML = '';
    const filteredTasks = filterTasks(tasks, taskFilter.value.toLowerCase());
    const sortedTasks = sortTasks(filteredTasks, sortSelect.value);

    sortedTasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.classList.add('task-item');
        if (task.completed) {
            listItem.classList.add('completed');
        }
        listItem.innerHTML = `
            <div class="table-row">
                <div class="table-cell">
                    <input type="checkbox" ${task.completed ? 'checked' : ''}> 
                </div>
                <div class="table-cell task-title" style="word-break:break-all;">${task.title}</div>
                <div class="table-cell task-description" style="word-break:break-all;">${task.description}</div>
                <div class="table-cell due-date">${task.dueDate}</div>
                <div class="task-actions table-cell">
                    <div class="table-cell"><button class="edit-button" data-id="${task.id}">Edit</button></div>
                    <div class="table-cell"><button class="delete-button" data-id="${task.id}">Delete</button></div>
                </div>
            </div>
        `;
        const checkbox = listItem.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            displayTasks();
        });

        const taskTitle = listItem.querySelector('.task-title');
        taskTitle.addEventListener('click', () => {
            editTaskTitle(task, taskTitle);
        });

        const taskDescription = listItem.querySelector('.task-description');
        taskDescription.addEventListener('click', () => {
            editTaskDescription(task, taskDescription);
        });

        const editButton = listItem.querySelector('.edit-button');
        editButton.addEventListener('click', () => {
            editTask(task);
        });

        const deleteButton = listItem.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            deleteTask(task.id);
        });

        taskList.appendChild(listItem);
    });
}

// Function to edit task title
function editTaskTitle(task, taskTitle) {
    const newTitle = prompt('Edit Task Title:', task.title);
    if (newTitle !== null) {
        task.title = newTitle;
        taskTitle.textContent = newTitle;
    }
}

// Function to edit task description
function editTaskDescription(task, taskDescription) {
    const newDescription = prompt('Edit Task Description:', task.description);
    if (newDescription !== null) {
        task.description = newDescription;
        taskDescription.textContent = newDescription;
    }
}

// Function to delete a task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    displayTasks();
}

// Function to filter tasks by search text
function filterTasks(tasks, searchText) {
    if (searchText === '') {
        return tasks;
    }
    return tasks.filter(task => task.title.toLowerCase().includes(searchText));
}

// Function to sort tasks by due date or status
function sortTasks(tasks, sortBy) {
    if (sortBy === 'duedate') {
        return tasks.slice().sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sortBy === 'status') {
        return tasks.slice().sort((a, b) => a.completed - b.completed);
    } else {
        return tasks;
    }
}

// Event listener for form submission
taskForm.addEventListener('submit', e => {
    e.preventDefault();
    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();
    const date = dueDate.value;
    if (title !== '' && description !== '' && date !== '') {
        addTask(title, description, date);
    }
});

// Event listener for task filtering
taskFilter.addEventListener('input', () => {
    displayTasks();
});

// Event listener for sorting tasks
sortSelect.addEventListener('change', () => {
    displayTasks();
});

// Initialize the application
displayTasks();