$(function () {
  // default task list
  const defaultTaskList = [
    {
      taskId: "1",
      taskName: "Create task form",
      taskDesc:
        "Create a form on the page, users should be able to add, edit, and delete tasks. Record at least 5 different details about each task. For example, you will at least need the Task description and who it is assigned to. Choose 3 or more other details to include for each task.",
      taskPriority: "High",
      studentName: "Gu, Yunxiang",
      studentNumber: "8904492",
    },
    {
      taskId: "2",
      taskName: "Page styles desgin",
      taskDesc:
        "Use CSS to make it look appealing. Display tasks in different colors. This can be random, alternating, or depend on the details of the task.",
      taskPriority: "Middle",
      studentName: "Gu, Yunxiang",
      studentNumber: "8904492",
    },
    {
      taskId: "3",
      taskName: "Store the tasks in localStorage",
      taskDesc:
        "Validate the task form values, push the task into the current task list and store it in localStorage",
      taskPriority: "High",
      studentName: "Kaul, Ritik",
      studentNumber: "8925412",
    },
    {
      taskId: "4",
      taskName: "Display the tasks on the page",
      taskDesc:
        "When the page loads, it should check localStorage and display all the tasks on the task list panel",
      taskPriority: "High",
      studentName: "Vellanji Alikunju, Thajudheen",
      studentNumber: "8909235",
    },
    {
      taskId: "5",
      taskName: "Task filter",
      taskDesc:
        "There should be a search filter that allows user to only display tasks that contain a certain text. If any detail of a task contains the text, it should be displayed. For example, if a person's name is typed in the search filter, only notes that contain their name or that are assigned to them should be displayed. Use Array.prototype.filter() to filter list of tasks.",
      taskPriority: "High",
      studentName: "Gopinath, Varun",
      studentNumber: "8929281",
    },
    {
      taskId: "6",
      taskName: "Code readability",
      taskDesc:
        "Make the code readable by making proper and consistent use of whitespace and indenting.",
      taskPriority: "Low",
      studentName: "Gu, Yunxiang",
      studentNumber: "8904492",
    },
  ];

  // Task 3, get task list from localStorage
  function getTaskListFromLocalStorage() {
    try {
      return JSON.parse(localStorage.getItem("taskList")) || defaultTaskList;
    } catch (error) {
      console.log(error);
    }
  }

  // Task 4, search task by text
  function searchTask(searchValue) {
    const trimmedSearchValue = searchValue.trim().toLowerCase();
    const taskList = getTaskListFromLocalStorage();
    const filteredTaskList = taskList.filter(
      (task) =>
        task.taskName.toLowerCase().includes(trimmedSearchValue) ||
        task.taskDesc.toLowerCase().includes(trimmedSearchValue) ||
        task.taskPriority.toLowerCase().includes(trimmedSearchValue) ||
        task.studentName.toLowerCase().includes(trimmedSearchValue) ||
        task.studentNumber.includes(trimmedSearchValue)
    );
    renderTaskList(filteredTaskList);
  }

  // Task 3, render task list into page
  function renderTaskList(list) {
    // Get the task list from params or localStorage
    const taskList = list || getTaskListFromLocalStorage();
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
  function getTaskDataById(id) {
    const taskList = getTaskListFromLocalStorage();
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
    // check if the task is to update
    const index = taskList.findIndex(({ taskId }) => taskId === data.taskId);
    // find the current task Id, update task
    if (index !== -1) {
      taskList[index] = data;
    } else {
      // push this task into current task list
      taskList.push(data);
    }
    // save task list in localStorage
    saveTaskList(taskList);
    // refresh page data
    initialPage();
  }

  // Task 1, create an available task id
  // If a task is deleted, its task id will be released to use again
  function createTaskId() {
    let id = 1;
    // get current task list
    const taskList = getTaskListFromLocalStorage();
    // get current task id from task list
    const ids = taskList.map(({ taskId }) => +taskId);
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
    // set task id in the form
    $("#taskId").val(createTaskId());
  }

  // Task 1, edit task
  function editTask(id) {
    // get task data by task id
    const taskData = getTaskDataById(id) || {};
    // The for loop traverses the keys and render data.
    for (let key in taskData) {
      $(`#${key}`).val(taskData[key]);
    }
  }

  // Task 1, delete task
  function deleteTask(id) {
    let taskList = getTaskListFromLocalStorage();
    // delete current task from list
    taskList = taskList.filter(({ taskId }) => taskId != id);
    // save new task list in localStorage
    saveTaskList(taskList);
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
