$(function () {

  // Task 3, get task list from localStorage
  async function getTaskListFromServer(searchValue = "") {
    try {
      const host = "/task/get";
      const url = searchValue ? host + "?searchValue=" + searchValue : host;
      const res = await fetch(url).then((res) => {
        if (res.ok) {
          return res.json();
        }
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  // Task 4, search task by text
  async function searchTask(searchValue) {
    const taskList = await getTaskListFromServer(searchValue);
    renderTaskList(taskList);
  }

  // Task 3, render task list into page
  async function renderTaskList(list) {
    // Get the task list from params or localStorage
    const taskList = list || (await getTaskListFromServer());
    // Select the table body where the tasks will be rendered
    const tbody = $("tbody");
    // Clear existing rows in the table body
    tbody.empty();
    // Loop through the task list and create HTML elements for each task
    (taskList || []).forEach((task) => {
      const row = $("<tr>");
      // Create table cells for each task property
      const taskIdCell = $("<td>").text(task.taskId);
      const taskNameCell = $("<td>").text(task.taskName);
      const taskDescCell = $("<td>").text(task.taskDesc);
      const taskPriorityCell = $("<td>")
        .text(task.taskPriority)
        .addClass(`taskPriority ${task.taskPriority}`);
      const studentNameCell = $("<td>")
        .text(task.studentName)
        .addClass("text-center");
      const studentNumberCell = $("<td>")
        .text(task.studentNumber)
        .addClass("text-center");

      // Create action cell with buttons for editing and deleting
      const actionsCell = $("<td>");
      const editButton = $(
        `<button class="edit px-2" data-id="${task.taskId}">Edit</button>`
      );
      const deleteButton = $(
        `<button class="delete px-2" data-id="${task.taskId}">Delete</button>`
      );

      // Attach click events to the edit and delete buttons
      editButton.on("click", function () {
        editTask(task.taskId);
      });

      deleteButton.on("click", function () {
        deleteTask(task.taskId);
      });

      // Append buttons to the actions cell
      actionsCell.append(editButton, deleteButton);

      // Append all cells to the row
      row.append(
        taskIdCell,
        taskNameCell,
        taskDescCell,
        taskPriorityCell,
        studentNameCell,
        studentNumberCell,
        actionsCell
      );

      // Append the row to the table body
      tbody.append(row);
    });
  }

  // Task 3, get the task by task id
  async function getTaskDataById(id) {
    const taskList = await getTaskListFromServer();
    return taskList.find((task) => task.taskId == id);
  }

  // Task 2, validate task form values
  function validateFormData(data) {
    if (
      !data.taskName ||
      !data.taskDesc ||
      !data.taskPriority ||
      !data.studentName ||
      !data.studentNumber
    ) {
      alert("All fields are required.");
      return false;
    }
    if (isNaN(data.studentNumber) || data.studentNumber.length != 7) {
      alert("Please type 7 digital numbers of Student Number.");
      return false;
    }
    return true;
  }

  // Task 2, save task data
  async function saveTaskData(data) {
    // validate the form data
    if (!validateFormData(data)) {
      return;
    }
    // get current task list
    const taskList = await getTaskListFromServer();
    // check if the task is to update
    const index = taskList.findIndex(({ taskId }) => taskId === data.taskId);
    let host;
    if (index !== -1) {
      fetch("/task/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } else {
      await fetch("/task/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
    // refresh page data
    initialPage();
  }

  // If a task is deleted, its task id will be released to use again
  async function createTaskId() {
    let id = 1;
    // get current task list
    const taskList = await getTaskListFromServer();
    // get current task id from task list
    const ids = taskList.map(({ taskId }) => +taskId);
    // get an availabled id
    while (ids.includes(id)) {
      id++;
    }
    return id;
  }

  // Task 1, reset form values
  async function resetForm() {
    // reset form values
    $("#form")[0].reset();
    const id = await createTaskId();
    // set task id in the form
    $("#taskId").val(id);
  }

  // Task 1, edit task
  async function editTask(id) {
    // get task data by task id
    const taskData = await getTaskDataById(id) || {};
    // The for loop traverses the keys and render data.
    for (let key in taskData) {
      $(`#${key}`).val(taskData[key]);
    }
  }

  // Task 1, delete task
  async function deleteTask(taskId) {
    await fetch("/task/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskId,
      }),
    });
    // refresh page status
    initialPage();
  }

  // Task 1, initial page data
  function initialPage() {
    // reset form data
    resetForm();
    // render task list
    renderTaskList();
  }

  // Task 1, get form values
  $("#submit").on("click", function (e) {
    e.preventDefault();
    // get the task form data
    const formValues = $("#form").serializeArray();
    // get the task id
    const taskId = $("#taskId").val();
    const formData = { taskId };
    // transform the form values array to object data
    formValues.forEach(({ name, value }) => {
      formData[name] = value;
    });
    // save task data
    saveTaskData(formData);
  });

  // Task 1, reset form data
  $("#resetForm").on("click", function (e) {
    e.preventDefault();
    resetForm();
  });

  // Task 4, search task
  $("#searchBtn").on("click", function (e) {
    e.preventDefault();
    const searchValue = $("#searchInput").val();
    searchTask(searchValue);
  });

  // Task 4, reset search input
  $("#resetSearch").on("click", function (e) {
    e.preventDefault();
    $("#searchInput").val("");
    renderTaskList();
  });

  // Task 1, initial page
  initialPage();
});
