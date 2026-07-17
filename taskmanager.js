
const defaultTasks = [
  { id: 1, text: "Calibrate 6-DOF robotic arm motors", completed: false },
  { id: 2, text: "Record YouTube tutorial for Arduino controller setup", completed: true },
  { id: 3, text: "Integrate lidar sensor nodes with navigation hub", completed: false },
  { id: 4, text: "Reply to LinkedIn robotics collaboration requests", completed: false },
  { id: 5, text: "Refactor portfolio site landing layout", completed: true }
];

let taskList = [];

document.addEventListener("DOMContentLoaded", () => {
  initTaskManager();
});

function initTaskManager() {
  const localData = localStorage.getItem("robo-tasks");
  if (localData) {
    try {
      taskList = JSON.parse(localData);
    } catch (e) {
      taskList = [...defaultTasks];
    }
  } else {
    taskList = [...defaultTasks];
    saveTasksToStorage();
  }

  renderTasks();

  
  const addBtn = document.getElementById("task-add-btn");
  const taskInput = document.getElementById("task-new-input");

  addBtn.addEventListener("click", () => {
    addNewTask(taskInput.value);
    taskInput.value = "";
  });

  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addNewTask(taskInput.value);
      taskInput.value = "";
    }
  });
}

function renderTasks() {
  const container = document.getElementById("task-items-container");
  container.innerHTML = "";

  if (taskList.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; color: var(--text-dim); padding-top: 40px; font-size: 14px;">
        All tasks resolved. Subsystems clear.
      </div>
    `;
    return;
  }

  taskList.forEach(task => {
    const item = document.createElement("div");
    item.className = `task-item ${task.completed ? "completed-task" : ""}`;

    item.innerHTML = `
      <div class="task-item-left">
        <div class="task-checkbox ${task.completed ? "checked" : ""}" onclick="toggleTaskState(${task.id})">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <span class="task-text">${task.text}</span>
      </div>
      <button class="task-delete-btn" onclick="deleteTask(${task.id})">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
      </button>
    `;

    container.appendChild(item);
  });
}

function toggleTaskState(id) {
  const task = taskList.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasksToStorage();
    renderTasks();
  }
}

function addNewTask(text) {
  const clean = text.trim();
  if (clean === "") return;

  const newTask = {
    id: Date.now(),
    text: clean,
    completed: false
  };

  taskList.push(newTask);
  saveTasksToStorage();
  renderTasks();
}

function deleteTask(id) {
  taskList = taskList.filter(t => t.id !== id);
  saveTasksToStorage();
  renderTasks();
}

function saveTasksToStorage() {
  localStorage.setItem("robo-tasks", JSON.stringify(taskList));
}
