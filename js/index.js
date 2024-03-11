$(function () {
  // default task list
  const defaultTaskList = [
    {
      taskId: "1",
      taskName: "Create task form",
      taskDesc:
        "Create a form on the page, users should be able to add, edit, and delete tasks",
      studentName: "Gu, Yunxiang",
      studentNumber: "8094492",
    },
    {
      taskId: "2",
      taskName: "Store the tasks in localStorage",
      taskDesc:
        "Validate the task form values, push the task into the current task list and store it in localStorage",
      studentName: "Kaul, Ritik",
      studentNumber: "8925412",
    },
    {
      taskId: "3",
      taskName: "Display the tasks on the page",
      taskDesc:
        "When the page loads, it should check localStorage and display all the tasks on the task list panel",
      studentName: "Vellanji Alikunju,Thajudheen",
      studentNumber: "8909235",
    },
    {
      taskId: "4",
      taskName: "Task filter",
      taskDesc:
        "Create a search input, the user should be able to filter the task via contains a certain text",
      studentName: "Gopinath,Varun",
      studentNumber: "8929281",
    },
  ];

  // Task 4, search task by text
  function searchTask(text) {
    // TO DO
    const searchValue = $("#searchInput").val();

    // Retrieve the task list from localStorage or use the default list
    const taskList = getTaskListFromLocalStorage();

    // Filter the task list based on the searchValue
    const filteredTaskList = taskList.filter(
      ({ taskName, taskDesc }) =>
        taskName.toLowerCase().includes(searchValue) ||
        taskDesc.toLowerCase().includes(searchValue)
    );

    // Render the filtered task list on the page
    renderTaskList(filteredTaskList);
  }

  // Task 3, render task list into page
  function renderTaskList() {
    // Get the task list from localStorage
    const taskList = getTaskListFromLocalStorage();

    // Select the table body where the tasks will be rendered
    const tbody = $("tbody");

    // Clear existing rows in the table body
    tbody.empty();

    // Loop through the task list and create HTML elements for each task
    taskList.forEach((task) => {
      const row = $("<tr>");

      // Create table cells for each task property
      const taskIdCell = $("<td>").text(task.taskId);
      const taskNameCell = $("<td>").text(task.taskName);
      const taskDescCell = $("<td>").text(task.taskDesc);
      const studentNameCell = $("<td>").text(task.studentName);
      const studentNumberCell = $("<td>").text(task.studentNumber);

      // Create action cell with buttons for editing and deleting
      const actionsCell = $("<td>");
      const editButton = $(
        `<button class="edit" data-id="${task.taskId}">Edit</button>`
      );
      const deleteButton = $(
        `<button class="delete" data-id="${task.taskId}">Delete</button>`
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
        studentNameCell,
        studentNumberCell,
        actionsCell
      );

      // Append the row to the table body
      tbody.append(row);
    });
  }

  // Task 3, get task list from localStorage
  function getTaskListFromLocalStorage() {
    const storedTaskList = JSON.parse(localStorage.getItem("taskList")) || [];
    return storedTaskList.length > 0 ? storedTaskList : defaultTaskList;
  }

  // Task 3, get the task by task id
  function getTaskDataById(id) {
    const taskList = getTaskListFromLocalStorage();
    const taskData = taskList.filter(({ taskId }) => taskId == id)[0];
    return taskData;
  }

  // Task 2, validate task form values
  function validateFormData(data) {
    if (
      !data.taskName ||
      !data.taskDesc ||
      !data.studentName ||
      !data.studentNumber
    ) {
      alert("All fields are required.");
      return false;
    }
    if (isNaN(data.studentNumber)) {
      alert("Student number must be a number.");
      return false;
    }
    return true;
  }

  // Task 2, save task list in localStorage
  function saveTaskList(taskList) {
    try {
      localStorage.setItem("taskList", JSON.stringify(taskList));
    } catch (error) {
      console.error(error);
    }
  }

  // Task 2, save task data
  function saveTaskData(data) {
    // validate the form data
    if (!validateFormData(data)) {
      return;
    }
    // get current task list
    const taskList = getTaskListFromLocalStorage();
    // push this task into current task list
    taskList.push(data);
    // save task list in localStorage
    saveTaskList(taskList);
  }

  // Task 1, create an availabled task id
  function createTaskId() {
    let id = 1;
    // get current task list
    const currentTaskList = getTaskListFromLocalStorage();
    // get current task id from task list
    const ids = currentTaskList.map(({ taskId }) => +taskId);
    // get an availabled id
    while (ids.includes(id)) {
      id++;
    }
    return id;
  }

  // Task 1, reset form values
  function resetForm() {
    // reset form values
    $("#form")[0].reset();
    // initial task id
    const id = createTaskId();
    // set task id in the form
    $("#taskId").val(id);
  }

  // Task 1, edit task
  function editTask(id) {
    // get task data by task id
    const taskData = getTaskDataById(id) || {};
    // render task values into page
    for (let key in taskData) {
      $(`#${key}`).val(taskData[key]);
    }
  }

  // Task 1, delete task
  function deleteTask(id) {
    const taskList = getTaskListFromLocalStorage();
    // delete current task from list
    const newTaskList = taskList.filter(({ taskId }) => taskId != id);
    // render new task list
    renderTaskList(newTaskList);
    // save new task list in localStorage
    saveTaskList(newTaskList);
  }

  // initial page data
  function initialPage() {
    // render task list
    renderTaskList();
    // reset form data
    resetForm();
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
    // refresh page data
    initialPage();
  });

  // reset form data
  $("#resetForm").on("click", function (e) {
    e.preventDefault();
    resetForm();
  });

  // edit task
  $(".edit").on("click", function (e) {
    const id = $(this).attr("data-id");
    editTask(id);
  });

  // remove task
  $(".delete").on("click", function (e) {
    const id = $(this).attr("data-id");
    deleteTask(id);
  });

  // initial page
  initialPage();
});
