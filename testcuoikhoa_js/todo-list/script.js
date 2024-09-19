document.addEventListener("DOMContentLoaded", () => {
  // Lấy các phần tử từ DOM
  const taskInput = document.getElementById("new-task"); // Ô nhập liệu cho task mới
  const addTaskButton = document.getElementById("add-task"); // Nút thêm task mới
  const taskList = document.getElementById("task-list"); // Danh sách các task
  const deleteAllButton = document.getElementById("delete-all"); // Nút xóa tất cả task
  const tabs = document.querySelectorAll(".tabs button"); // Các nút lọc task (All, Active, Completed)

  // Lấy các task từ localStorage hoặc khởi tạo mảng trống nếu không có task nào
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Hàm render task (All, Active, Completed)
  const renderTasks = (filter) => {
    taskList.innerHTML = ""; // Xóa tất cả nội dung hiện tại của danh sách task
    let filteredTasks = tasks; // Khởi tạo mảng task đã lọc

    // Lọc task theo trạng thái
    if (filter === "active") {
      filteredTasks = tasks.filter((task) => !task.completed); // Chỉ lấy task chưa hoàn thành
    } else if (filter === "completed") {
      filteredTasks = tasks.filter((task) => task.completed); // Chỉ lấy task đã hoàn thành
    }

    // Hiển thị từng task trong danh sách đã lọc
    filteredTasks.forEach((task) => {
      const taskItem = document.createElement("li"); // Tạo phần tử <li> cho task
      taskItem.classList.toggle("completed", task.completed); // Thêm class 'completed' nếu task đã hoàn thành
      taskItem.innerHTML = `
                <input type="checkbox" ${
                  task.completed ? "checked" : ""
                }> <!-- Checkbox cho task -->
                <span>${task.text}</span> <!-- Văn bản của task -->
                <button class="delete-task">X</button> <!-- Nút xóa task -->
            `;
      taskList.appendChild(taskItem); // Thêm task vào danh sách

      // Xử lý sự kiện khi người dùng thay đổi trạng thái hoàn thành của task
      const checkbox = taskItem.querySelector("input");
      checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked; // Cập nhật trạng thái hoàn thành của task
        saveTasks(); // Lưu lại các task vào localStorage
        renderTasks(filter); // Render lại danh sách task theo bộ lọc
      });

      // Xử lý sự kiện khi người dùng xóa task
      const deleteButton = taskItem.querySelector(".delete-task");
      deleteButton.addEventListener("click", () => {
        tasks = tasks.filter((t) => t !== task); // Loại bỏ task khỏi danh sách
        saveTasks(); // Lưu lại các task vào localStorage
        renderTasks(filter); // Render lại danh sách task theo bộ lọc
      });
    });

    // Hiển thị hoặc ẩn nút xóa tất cả dựa trên số lượng task
    deleteAllButton.classList.toggle("hidden", tasks.length === 0);
  };

  // Hàm lưu các task vào localStorage
  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Xử lý sự kiện khi người dùng thêm task mới
  addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim(); // Lấy văn bản từ ô nhập liệu và loại bỏ khoảng trắng thừa
    if (taskText) {
      tasks.push({ text: taskText, completed: false }); // Thêm task mới vào danh sách với trạng thái chưa hoàn thành
      saveTasks(); // Lưu lại các task vào localStorage
      renderTasks(document.querySelector(".tabs button.active").id); // Render lại danh sách task theo tab đang hoạt động
      taskInput.value = ""; // Xóa nội dung trong ô nhập liệu
    }
  });

  // Xử lý sự kiện khi người dùng xóa tất cả task
  deleteAllButton.addEventListener("click", () => {
    tasks = []; // Xóa tất cả các task
    saveTasks(); // Lưu lại các task vào localStorage
    renderTasks(document.querySelector(".tabs button.active").id); // Render lại danh sách task theo tab đang hoạt động
  });

  // Xử lý sự kiện khi người dùng chuyển tab (All, Active, Completed)
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active")); // Bỏ class 'active' khỏi tất cả các tab
      tab.classList.add("active"); // Thêm class 'active' vào tab được chọn
      renderTasks(tab.id); // Render lại danh sách task theo tab được chọn
    });
  });
  renderTasks("all");
});
