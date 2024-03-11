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
      studentName: "",
      studentNumber: "",
    },
    {
      taskId: "4",
      taskName: "Task filter",
      taskDesc:
        "Create a search input, the user should be able to filter the task via contains a certain text",
      studentName: "",
      studentNumber: "",
    },
  ];

  // Task 4, search task by text
  function searchTask(text) {
    // TO DO
    const searchValue = $("#searchInput").val();
  }

  // Task 3, render task list into page
  function renderTaskList() {
    // TO DO
  }

  // Task 3, get task list from localStorage
  function getTaskListFromLocalStorage() {
    let taskList;
    try {
      taskList =
        JSON.parse(localStorage.getItem("taskList")) || defaultTaskList;
    } catch (error) {
      console.error(error);
    }
    return taskList;
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

  // create an availabled task id
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

  // reset form values
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
    // get current task list
    const currentTaskList = getTaskListFromLocalStorage();
    // render task list
    renderTaskList(currentTaskList);
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
    // reset form
    resetForm();
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
  $(".delete").on("click", function(e) {
    const id = $(this).attr("data-id");
    deleteTask(id);
  });

  // initial page
  initialPage();
});
