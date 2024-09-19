function addTask() {
  var taskInput = document.getElementById("new-task");
  var taskText = taskInput.value;

  if (taskText === "") {
    alert("vui long nhap lai");
    return;
  }

  var newTask = document.createElement("li");
  newTask.textContent = taskText;

  var todoList = document.getElementById("todo-list");
  todoList.appendChild(newTask);

  taskInput.value = "";
}
