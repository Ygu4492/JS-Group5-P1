$(function () {
  const defaultTaskList = [
    {
      taskId: 1,
      taskName: "Create task form",
      taskDesc:
        "Create a form on the page, users should be able to add, edit, and delete tasks",
      studentName: "Gu, Yunxiang",
      studentNumber: "8094492",
    },
    {
      taskId: 2,
      taskName: "Store the tasks in localStorage",
      taskDesc:
        "Validate the task form values, push the task into the current task list and store it in localStorage",
      studentName: "Kaul, Ritik",
      studentNumber: "8925412",
    },
    {
      taskId: 3,
      taskName: "Display the tasks on the page",
      taskDesc:
        "When the page loads, it should check localStorage and display all the tasks on the task list panel",
      studentName: "",
      studentNumber: "",
    },
    {
      taskId: 4,
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
    // TO DO

    // mock code
    return defaultTaskList;
  }

  // Task 3, get the task by task id
  function getTaskDataById(id) {
    const taskList = getTaskListFromLocalStorage();
    const taskData = taskList.filter(({ taskId }) => taskId == id)[0];
    return taskData;
  }

  // Task 2, validate task form values
  function validateFormData(data) {

  }

  // Task 2, save task list in localStorage
  function saveTaskList(taskList) {

  }

  // Task 2, save task data
  function saveTaskData(data) {
    // TO DO
    console.log(data);
    // validate the form data
    // get current task list
    // push this task into current task list
    // save task list in localStorage
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
    const newTaskList = taskList.filter(({ taskId }) => taskId != id);
    // save new task list in localStorage
    // TO DO
    saveTaskList(newTaskList);
  }

  // Task 1, get form values
  $("#submit").on("click", function (e) {
    e.preventDefault();
    const formValues = $("#form").serializeArray();
    const taskId = $("#taskId").val();
    const formData = { taskId };
    formValues.forEach(({ name, value }) => {
      formData[name] = value;
    });
    saveTaskData(formData);
  });

  // mock code
  $(".edit").on("click", function (e) {
    const id = $(this).attr('data-id');
    editTask(id);
  });
});
