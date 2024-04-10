/**
 * export create, update, read, delete 4 apis
 * @author Ygu4492@conestogac.on.ca
 * @studentNumber 8904492
 */
const express = require("express");
const fs = require("fs");
const path = require("path");

const routes = express.Router();

// task local file path
const tasksFilePath = path.join(__dirname, "tasks.json");

const defaultTaskList = [
  {
    taskId: "1",
    taskName:
      "Write a REST API server for nodejs using the http-server or express module.",
    taskDesc:
      "The API should support the following functions: 1. Read all tasks 2. Read a single task 3. Create a new task 4. Update a task 5. Delete a task. Make sure your REST API follows REST conventions.  The tasks should be saved to a json file on the server side.",
    taskPriority: "High",
    studentName: "Gu, Yunxiang",
    studentNumber: "8904492"
  },
];

// load task
const loadTask = async () => {
  try {
    // read the tasks.txt file
    const data = fs.readFileSync(tasksFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading tasks:", error);
    return defaultTaskList;
  }
};

// save task
const saveTask = async (data) => {
  try {
    fs.writeFileSync(tasksFilePath, JSON.stringify(data));
    console.log("Tasks saved successfully!");
  } catch (error) {
    console.error("Error saving tasks:", error);
  }
};

// query task
routes.get("/task/get", async (req, res) => {
  try {
    const { searchValue } = req.query;
    // load tasks file
    let data = await loadTask();
    if (searchValue) {
      const search = searchValue.toLowerCase();
      data = data.filter(
        (task) =>
          task.taskName.toLowerCase().includes(search) ||
          task.taskDesc.toLowerCase().includes(search) ||
          task.taskPriority.toLowerCase().includes(search) ||
          task.studentName.toLowerCase().includes(search) ||
          task.studentNumber.includes(search)
      );
    }
    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error getting tasks:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

const validateFormData = (data) => {
  const { taskName, taskDesc, taskPriority, studentName, studentNumber } = data;
  if (
    !taskName ||
    !taskDesc ||
    !taskPriority ||
    !studentName ||
    !studentNumber
  ) {
    return "All fields are required.";
  }
  if (isNaN(studentNumber) || studentNumber.length != 7) {
    return "Please enter a 7-digit student number.";
  }
  return "";
};

// add task
routes.post("/task/add", async (req, res) => {
  const errorMessage = validateFormData(req.body);
  // form data validate error
  if (errorMessage) {
    return res.status(401).json({
      success: false,
      message: errorMessage,
    });
  }

  const { taskId } = req.body;
  const data = await loadTask();
  const task = data.find((task) => task.taskId == taskId);
  // if already have a task with the same task id
  if (task) {
    return res.status(401).json({
      success: false,
      message: `Task ${taskId} already exists.`,
    });
  }
  // add task
  data.push(req.body);
  await saveTask(data);

  res.status(201).json({
    success: true,
    message: "Added successfully!",
  });
});

// update task
routes.put("/task/update", async (req, res) => {
  const errorMessage = validateFormData(req.body);
  // form data validate error
  if (errorMessage) {
    return res.status(401).json({
      success: false,
      message: errorMessage,
    });
  }

  const { taskId } = req.body;
  let data = await loadTask();

  const taskIndex = data.findIndex((task) => task.taskId == taskId);
  // if current task doesn't exists
  if (taskIndex === -1) {
    return res.status(401).json({
      success: false,
      message: `Task ${taskId} does not exists.`,
    });
  }
  // update task
  data[taskIndex] = req.body;
  await saveTask(data);

  res.status(201).json({
    success: true,
    message: `Task ${taskId} updated successfully!`,
  });
});

// delete task
routes.delete("/task/delete", async (req, res) => {
  const { taskId } = req.body;
  let data = await loadTask();
  const taskIndex = data.findIndex((task) => task.taskId == taskId);
  // if can't find current task, return
  if (taskIndex === -1) {
    return res.status(401).json({
      success: false,
      message: `Task ${taskId} does not exists.`,
    });
  }
  // delete task
  data.splice(taskIndex, 1);
  await saveTask(data);

  res.status(201).json({
    success: true,
    message: `Task ${taskId} deleted successfully!`,
  });
});

module.exports = routes;
