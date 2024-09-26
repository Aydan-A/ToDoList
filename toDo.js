let appContainer = document.querySelector(".ToDo-container");
let inputData = document.querySelector(".inputdata");
let submitBtn = document.querySelector(".submit");
let tasksContainer = document.querySelectorAll(".filter-buttons div");
let alltaskFilter = document.querySelector(".all-tasks");
let pendingTasksFilter = document.querySelector(".pending-tasks");
let completedTasksFilter = document.querySelector(".completed-tasks");
let clearAll = document.querySelector(".clear-all");
let message = document.querySelector(".task-message");
let Status = document.querySelector(".status");
let progresBar = document.querySelector(".progress-bar");

let Tasks = 0;
let done = 0;

window.onload = loadTasks;

function saveTasks() {
  const tasks = Array.from(document.querySelectorAll(".tasks")).map((task) => {
    const checkbox = task.querySelector("input[type='checkbox']");
    const label = task.querySelector("label");
    return { text: label.innerHTML, completed: checkbox.checked };
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  storedTasks.forEach((task) => {
    addTask(task.text, task.completed, false);
    Tasks++;
    if (task.completed) done++;
  });
  updateProgress();
}

alltaskFilter.addEventListener("click", () => {
  filterTasks("all");
});

pendingTasksFilter.addEventListener("click", () => {
  filterTasks("pending");
});

completedTasksFilter.addEventListener("click", () => {
  filterTasks("completed");
});

function addTask(myTask, isCompleted = false, save = true) {
    // Only increment tasks when adding a new one, not when loading
  if (save) Tasks++;
  Status.innerHTML = Status.innerHTML = `You have ${Tasks} task(s)`;

  let divContainer = document.createElement("div");
  divContainer.setAttribute("class", `${Tasks} tasks`);

  let divMyTask = document.createElement("div");
  divMyTask.setAttribute("class", "checkboxtasks");

  let newTaskcheck = document.createElement("input");
  newTaskcheck.setAttribute("type", "checkbox");
  newTaskcheck.checked = isCompleted;

  let newTask = document.createElement("label");
  newTask.innerHTML = myTask;

  message.appendChild(divContainer);
  divContainer.append(divMyTask);
  divMyTask.appendChild(newTaskcheck);
  divMyTask.appendChild(newTask);

  newTaskcheck.addEventListener("change", () => {
    if (newTaskcheck.checked) {
      newTask.style.textDecoration = "line-through";
      done++;
    } else {
      newTask.style.textDecoration = "none";
      done--;
    }
    // Update progress bar based on the completed tasks
    updateProgress();

    if (save) saveTasks();
  });

  let threedot = document.createElement("div");
  threedot.setAttribute("class", "threedot");
  threedot.innerHTML = "•••";
  divContainer.appendChild(threedot);

  let threedotContainer = document.createElement("div");
  threedotContainer.setAttribute("class", "dropdown-menu");

  let edit = document.createElement("div");
  edit.innerHTML = "Edit";

  let deLete = document.createElement("div");
  deLete.innerHTML = "Delete";

  threedotContainer.appendChild(edit);
  threedotContainer.appendChild(deLete);

  threedot.appendChild(threedotContainer);

  deLete.addEventListener("click", () => {
    if (newTaskcheck.checked) {
      done--;
    }
    let hr = divContainer.nextElementSibling;
    hr.remove();
    divContainer.remove();
    Tasks--;
    Status.innerHTML = Status.innerHTML = `You have ${Tasks} task(s)`;
    updateProgress();
    saveTasks();
  });

  edit.addEventListener("click", function () {
    let inputEdit = document.createElement("input");
    inputEdit.type = "text";
    inputEdit.value = myTask;
    inputEdit.classList.add("edit-input");
    divMyTask.replaceChild(inputEdit, newTask);

    inputEdit.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const newValue = inputEdit.value.trim();
        if (newValue) {
          newTask.innerHTML = newValue;
          inputEdit.replaceWith(newTask);
        } else {
          alert("Task cannot be empty!");
        }
      }
    });
  });

  threedot.addEventListener("click", () => {
    if (threedotContainer.style.display === "none") {
      threedotContainer.style.display = "block";
    } else {
      threedotContainer.style.display = "none";
    }
  });

  // Add horizontal line between tasks
  let hr = document.createElement("hr");
  hr.classList.add("task-separator");
  message.appendChild(hr); // Append horizontal line after each task
}

function updateProgress() {
    let progress = Math.floor((done / Tasks) * 100);
    progresBar.style.width = `${progress}%`;
    progresBar.innerHTML = `${progress}%`;
    progresBar.style.paddingLeft = "10px";
    Status.innerHTML = `You have ${Tasks} task(s) and you completed ${progress} % out of 100%`;
  }

submitBtn.addEventListener("click", () => {
  let myTask = inputData.value;
  if (myTask === "") {
    alert("Task cannot be empty!");
  } else {
    addTask(myTask, false, true);
    inputData.value = "";
  }
});

function filterTasks(filter) {
  let alltasks = document.querySelectorAll(".tasks");
  const allHr = document.querySelectorAll(".task-separator");
  alltasks.forEach((task, index) => {
    const checkbox = task.querySelector("input[type='checkbox']");
    switch (filter) {
      case "all":
        task.style.display = "flex";
        allHr[index].style.display = "block";
        break;
      case "pending":
        if (!checkbox.checked) {
          task.style.display = "flex";
          allHr[index].style.display = "block";
        } else {
          task.style.display = "none";
          allHr[index].style.display = "none";
        }
        break;
      case "completed":
        if (checkbox.checked) {
          task.style.display = "flex";
          allHr[index].style.display = "block";
        } else {
          task.style.display = "none";
          allHr[index].style.display = "none";
        }
        break;
    }
  });
}

tasksContainer.forEach((taskBtn) => {
  taskBtn.addEventListener("click", function () {
    tasksContainer.forEach((btn) => btn.classList.remove("clickedBtn"));
    this.classList.add("clickedBtn");
  });
});

clearAll.addEventListener("click", () => {
  // Check if there are any tasks to clear
  if (message.children.length > 0) {
    message.innerHTML = "";
    // Reset task counters
    Tasks = 0;
    done = 0;
    // Reset progress bar
    progresBar.style.width = `0%`;
    progresBar.innerHTML = `0%`;
    localStorage.removeItem("tasks");
    // Update task status text
  } else {
    alert("There are no tasks to clear!");
  }
});
