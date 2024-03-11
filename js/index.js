$(function () {
    const defaultTaskList = [
        {
            taskId: 1,
            taskName: "Create task form",
            taskDesc: "Create a form on the page, users should be able to add, edit, and delete tasks",
            studentName: "Gu, Yunxiang",
            studentNumber: "8094492",
        },
        {
            taskId: 2,
            taskName: "Store the tasks in localStorage",
            taskDesc: "Validate the task form values, push the task into the current task list and store it in localStorage",
            studentName: "Kaul, Ritik",
            studentNumber: "8925412",
        },
        {
            taskId: 3,
            taskName: "Display the tasks on the page",
            taskDesc: "When the page loads, it should check localStorage and display all the tasks on the task list panel",
            studentName: "",
            studentNumber: "",
        },
        {
            taskId: 4,
            taskName: "Task filter",
            taskDesc: "Create a search input, the user should be able to filter the task via contains a certain text",
            studentName: "Gopinath, Varun",
            studentNumber: "8929281",
        },
    ];

    // Search and filter tasks
    function searchTask() {
        const searchValue = $("#searchInput").val().toLowerCase();
        const taskList = getTaskListFromLocalStorage();
        const filteredTasks = taskList.filter(task => 
            task.taskName.toLowerCase().includes(searchValue) ||
            task.taskDesc.toLowerCase().includes(searchValue) ||
            task.studentName.toLowerCase().includes(searchValue) ||
            task.studentNumber.toString().toLowerCase().includes(searchValue)
        );
        renderTaskList(filteredTasks);
    }

    // Render tasks into the page
    function renderTaskList(taskList) {
        const taskListContainer = $("tbody");
        taskListContainer.empty(); // Clear existing tasks
        taskList.forEach(task => {
            const taskRow = `<tr>
                <td>${task.taskId}</td>
                <td>${task.taskName}</td>
                <td>${task.taskDesc}</td>
                <td>${task.studentName}</td>
                <td>${task.studentNumber}</td>
                <td>
                    <button class="edit" data-id="${task.taskId}">Edit</button>
                    <button class="delete" data-id="${task.taskId}">Delete</button>
                </td>
            </tr>`;
            taskListContainer.append(taskRow);
        });

        // Rebind edit and delete button events every time the task list is rendered
        bindTaskActions();
    }

    // Fetch tasks from localStorage
    function getTaskListFromLocalStorage() {
        const storedTasks = localStorage.getItem("taskList");
        return storedTasks ? JSON.parse(storedTasks) : defaultTaskList;
    }

    // Save tasks to localStorage
    function saveTaskListInLocalStorage(taskList) {
        localStorage.setItem("taskList", JSON.stringify(taskList));
        renderTaskList(taskList); // Re-render the task list after any change
    }

    // Edit task
    function editTask(id) {
        const taskList = getTaskListFromLocalStorage();
        const taskToEdit = taskList.find(task => task.taskId == id);
        if (taskToEdit) {
            $("#taskId").val(taskToEdit.taskId);
            $("#taskName").val(taskToEdit.taskName); // Populate taskName field
            $("#taskDesc").val(taskToEdit.taskDesc); // Populate taskDesc field
            $("#studentName").val(taskToEdit.studentName); // Populate studentName field
            $("#studentNumber").val(taskToEdit.studentNumber); // Populate studentNumber field
            $("#submit").attr("data-editing-id", id); // Mark the form as editing mode
        }
    }

    // Delete task
    function deleteTask(id) {
        let taskList = getTaskListFromLocalStorage();
        taskList = taskList.filter(task => task.taskId != id);
        saveTaskListInLocalStorage(taskList);
    }

    // Handle form submission for adding or editing tasks
    $("#submit").click(function (e) {
        e.preventDefault();
        const taskList = getTaskListFromLocalStorage();
        let newTaskId = taskList.length > 0 ? Math.max(...taskList.map(task => parseInt(task.taskId))) + 1 : 1;
        const isEditing = $(this).attr("data-editing-id");
        const formData = {
            taskId: isEditing ? isEditing : newTaskId.toString(),
            taskName: $("#taskName").val(),
            taskDesc: $("#taskDesc").val(),
            studentName: $("#studentName").val(),
            studentNumber: $("#studentNumber").val(),
        };

        if (isEditing) {
            const index = taskList.findIndex(task => task.taskId == isEditing);
            taskList[index] = formData;
            $(this).removeAttr("data-editing-id"); // Exit editing mode
        } else {
            taskList.push(formData);
        }

        saveTaskListInLocalStorage(taskList);
    });

    // Bind actions to edit and delete buttons
    function bindTaskActions() {
        $(document).on('click', '.edit', function () {
            const id = $(this).data('id');
            editTask(id);
        });

        $(document).on('click', '.delete', function () {
            const id = $(this).data('id');
            deleteTask(id);
        });
    }

    // Attach the event listener to the search input for triggering search on input
    $("#searchInput").on("input", searchTask);

    // Initial tasks rendering
    $(document).ready(function() {
        renderTaskList(getTaskListFromLocalStorage());
    });
});
