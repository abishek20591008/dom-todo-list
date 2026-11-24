// Store the tasks in an array. The array is loaded from localStorage when the page opens.
const STORAGE_KEY = "domProjectTasks";
let tasks = loadTasks();
let currentFilter = "all";

// Get the HTML elements that JavaScript needs to update.
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const formError = document.querySelector("#form-error");
const taskList = document.querySelector("#task-list");
const taskCount = document.querySelector("#task-count");
const emptyMessage = document.querySelector("#empty-message");
const clearCompletedButton = document.querySelector("#clear-completed");
const filterButtons = document.querySelectorAll(".filter-button");

// Read saved tasks. If there is no saved data or it is invalid, start with an empty array.
function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch (error) {
    return [];
  }
}

// Save the current task array in the browser.
function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Show a validation message and highlight the input.
function showError(message) {
  formError.textContent = message;
  taskInput.classList.add("invalid");
  taskInput.setAttribute("aria-invalid", "true");
}

// Clear the validation message and highlight.
function clearError() {
  formError.textContent = "";
  taskInput.classList.remove("invalid");
  taskInput.removeAttribute("aria-invalid");
}

// Add a new task after validating the input.
function addTask(event) {
  event.preventDefault();

  const taskName = taskInput.value.trim();

  if (taskName.length < 3) {
    showError("Please enter a task with at least 3 characters.");
    taskInput.focus();
    return;
  }

  if (taskName.length > 80) {
    showError("Your task must be 80 characters or fewer.");
    taskInput.focus();
    return;
  }

  const newTask = {
    id: Date.now(),
    text: taskName,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  taskForm.reset();
  clearError();
  currentFilter = "all";
  updateFilterButtons();
  renderTasks();
  taskInput.focus();
}

// Create and display the task list based on the selected filter.
function renderTasks() {
  taskList.replaceChildren();

  const visibleTasks = tasks.filter((task) => {
    if (currentFilter === "active") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true;
  });

  visibleTasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = "task-item";
    if (task.completed) item.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `Mark ${task.text} as completed`);
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete ${task.text}`);
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    item.append(checkbox, text, deleteButton);
    taskList.append(item);
  });

  const openTasks = tasks.filter((task) => !task.completed).length;
  taskCount.textContent = `${openTasks} ${openTasks === 1 ? "task" : "tasks"} left`;
  emptyMessage.hidden = visibleTasks.length > 0;
  emptyMessage.textContent = tasks.length === 0
    ? "No tasks yet. Add your first task above."
    : "No tasks match this filter.";
}

// Change a task between active and completed.
function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

// Delete one task.
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  renderTasks();
}

// Remove all completed tasks.
function clearCompleted() {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  renderTasks();
}

// Change the visible filter.
function updateFilterButtons() {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === currentFilter;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

taskForm.addEventListener("submit", addTask);
taskInput.addEventListener("input", clearError);
clearCompletedButton.addEventListener("click", clearCompleted);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    updateFilterButtons();
    renderTasks();
  });
});

// Show saved tasks when the page first loads.
updateFilterButtons();
renderTasks();
