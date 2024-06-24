// task/todo manager
// we store our tasks in a json format in a file
const fs = require("fs");
const path = require("path");
const readLine = require("readline");

// console.log(__dirname);
// D:\NodeJs\projects\node_ToDoList
const taskFilePath = path.join(__dirname, "tasks.json");
// console.log(taskFilePath);
// D:\NodeJs\projects\node_ToDoList\tasks.json

// Ensure the File Exists
if (!fs.existsSync(taskFilePath)) {
  console.log("File does not exist, creating it now!");
  fs.writeFileSync(taskFilePath, JSON.stringify([]));
}

// taking input from users through TERMINAL
const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getMyTasks = () => {
  const tasks = fs.readFileSync(taskFilePath, "utf-8");
  return JSON.parse(tasks);
};

const saveMyTasks = (tasks) => {
  fs.writeFileSync(taskFilePath, JSON.stringify(tasks));
};

//Adding a task 1
const addTask = (task) => {
  const tasks = getMyTasks();
  tasks.push({ description: task, completed: false });
  saveMyTasks(tasks);
  console.info("Task added Successfully");
};

// listing a task 2
const listTasks = () => {
  const tasks = getMyTasks();
  tasks.forEach((task, index) => {
    console.log(
      `${index + 1}. ${task.description} - [${task.completed ? "X" : ""}]`
    );
  });
};

// Mark task as Complete Task 3
const completeTask = (taskNo) => {
  const tasks = getMyTasks();
  if (tasks[taskNo - 1]) {
    tasks[taskNo - 1].completed = true;
    saveMyTasks(tasks);
    console.info("Task completed successfully");
  } else {
    console.warn("invalid task number");
  }
  return;
};

// Deleting a task

const deletingTask = (taskNo) => {
  const tasks = getMyTasks();
  if (tasks[taskNo - 1]) {
    const filteredTask = tasks.filter((task, index) => index !== taskNo - 1);
    saveMyTasks(filteredTask);
    console.info("Task deleted successfully");
  } else {
    console.warn("invalid task number");
  }
  return;
};

function todoManager() {
  rl.question(
    `What would you like to do?
    1. Add a Task
    2. List all the Task 
    3. Mark task as completed
    4. Delete a Task
    Your Option:- `,
    (answer) => {
      switch (answer) {
        case "1":
          rl.question("Enter Your Task: ", (task) => {
            console.log(`Adding Task: ${task}`);
            addTask(task);
            todoManager();
          });
          break;
        case "2":
          console.log("Your saved tasks:");
          listTasks();
          todoManager();
          break;
        case "3":
          rl.question(
            "Enter the task number you want to complete ",
            (taskNo) => {
              completeTask(parseInt(taskNo));
              todoManager();
            }
          );
          break;
        case "4":
          rl.question("Enter the task number you want to delete:", (taskNo) => {
            deletingTask(taskNo);
            todoManager();
          });
          break;
        default:
          console.log("Invalid option");
          todoManager();
      }
    }
  );
}

todoManager();
