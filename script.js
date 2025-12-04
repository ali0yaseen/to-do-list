const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filters button");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks
    .map((task, index) => ({ ...task, originalIndex: index })) // نضيف فهرس حقيقي
    .filter((task) => {
      if (currentFilter === "all") return true;
      if (currentFilter === "completed") return task.completed;
      if (currentFilter === "pending") return !task.completed;
    });

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <div class="task-info">
        <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask(${task.originalIndex})">
        <span class="text" ondblclick="editInline(${task.originalIndex}, this)">${task.text}</span>
      </div>
      <div class="actions">
        <span class="delete" onclick="deleteTask(${task.originalIndex})">🗑️</span>
      </div>
    `;

    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;
  tasks.push({ text, completed: false });
  saveTasks();
  taskInput.value = "";
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editInline(index, spanElement) {
  const oldText = tasks[index].text;
  const input = document.createElement("input");
  input.type = "text";
  input.value = oldText;
  input.className = "edit-input";
  spanElement.replaceWith(input);
  input.focus();

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") saveEdit(index, input);
  });

  input.addEventListener("blur", () => {
    saveEdit(index, input);
  });
}

function saveEdit(index, input) {
  const newText = input.value.trim();
  if (newText !== "") {
    tasks[index].text = newText;
    saveTasks();
  }
  renderTasks();
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".filters .active").classList.remove("active");
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

renderTasks();
