
# Adv JavaScript Group Project 2

## Professor: Anshul Sharma

Section Number: 7

Group Number: 5

Group Members:

- Gopinath, Varun
- Gu, Yunxiang
- Kaul, Ritik
- Vellanji Alikunju, Thajudheen

---

### Instructions

**Gopinath, Varun:**

**Gu, Yunxiang:** Write a REST API server for nodejs using the http-server or express module. The API should support the following functions: 1. Read all tasks 2. Read a single task 3. Create a new task 4. Update a task 5. Delete a task. Make sure your REST API follows REST conventions.  The tasks should be saved to a json file on the server side.

**Kaul, Ritik:**

**Vellanji Alikunju, Thajudheen:**

---

#### Development Guide

##### Preparation
```bash
$ npm i
```

##### Start Development
```bash
$ npm start
```

##### Development
Open Chrome browse http://localhost:4000

##### API Document
```JavaScript
// create a task
fetch("/task/add", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    taskId: "1",
    taskName: "Task Name",
    taskDesc: "Task Description",
    taskPriority: "High",
    studentName: "Student Name",
    studentNumber: "Student Number"
  })
});

// update a task
fetch("/task/add", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    taskId: "1",
    taskName: "Task Name",
    taskDesc: "Task Description",
    taskPriority: "High",
    studentName: "Student Name",
    studentNumber: "Student Number"
  })
});

// read all tasks
fetch("/task/get");
// read with a search value
fetch("/task/get?searchValue=abc");

// delete a task
fetch("/task/delete", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    taskId: "Task Id",
  })
});
```

##### Data structure from API response
```JavaScript
{
  success: true,
  data: [], // task list
  message: "message"
}
```
