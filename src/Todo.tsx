import React, { useState, ChangeEvent, useEffect } from "react";
import { v4 as uuidV4 } from "uuid";
import { TaskTypes } from "./Types";
import { Tasks } from "./components/helpers/Tasks";
import Swal from "sweetalert2";
import {
  BsFillTrashFill,
  BsCheckCircle,
  BsCheckCircleFill,
} from "react-icons/bs";
import { BiSolidMessageAltEdit } from "react-icons/bi";
export function Todo() {
  const [todoList, setTodoList] = useState<TaskTypes[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("all");
  const [task, setTask] = useState<string>("");
  const [category, setCategory] = useState<string>("Others");
  const [taskEditable, setEditable] = useState<string | null>(null);
  const [editedTask, setEditedTask] = useState<string>("");
  const storedTodoList = localStorage.getItem("todoList");

  useEffect(() => {
    if (storedTodoList) {
      setTodoList(JSON.parse(storedTodoList));
    }
  }, []);

  function swalError() {
    Swal.fire({
      title: "Error!",
      text: "Please type a task title and category!",
      icon: "error",
      confirmButtonText: "OK",
    });
  }

  function handleInputTitle(event: ChangeEvent<HTMLInputElement>) {
    setTask(event.target.value);
  }

  const handleTaskTitleChange = (newTitle: string) => {
    setEditedTask(newTitle);
  };

  function addTask() {
    const newTask = {
      taskID: uuidV4(),
      taskDate: new Date(),
      taskTitle: task,
      taskCategory: category,
      taskStatus: false,
    };

    if (newTask.taskTitle.trim() === "") {
      swalError();
    } else {
      setTodoList([...todoList, newTask]);
      setTask("");
    }
  }

  function deleteTask(id: string) {
    Swal.fire({
      title: "Delete this task?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Task has been deleted.",
          icon: "success",
        });
        const updatedTask = todoList.filter(
          (todoList) => todoList.taskID !== id
        );
        setTodoList(updatedTask);
      }
    });
  }

  function editButton(id: string) {
    if (editedTask === id) {
      setEditable(null);
    } else {
      setEditable(id);
      const taskToEdit = todoList.find((task) => task.taskID === id);
      if (taskToEdit) {
        setEditedTask(taskToEdit.taskTitle);
      }
    }
  }

  function updateStatus(id: string) {
    setTodoList(
      todoList.map((task) => {
        if (task.taskID === id) {
          return { ...task, taskStatus: !task.taskStatus };
        }
        return task;
      })
    );
  }

  const saveEditedTask = (id: string) => {
    setTodoList(
      todoList.map((task) => {
        if (task.taskID === id) {
          return { ...task, taskTitle: editedTask };
        }
        return task;
      })
    );

    setEditable(null);
  };

  function filterStatus(val: ChangeEvent<HTMLSelectElement>) {
    setStatusFilter(val.target.value);
  }

  function handleCategory(val: ChangeEvent<HTMLSelectElement>) {
    setCategory(val.target.value);
  }

  function sortType(val: ChangeEvent<HTMLSelectElement>) {
    setSortBy(val.target.value);
  }

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="main-cont">
      <div className="header">
        <div className="line-cont">
          <div className="line"></div>
        </div>
        <div className="header-text-cont">
          <p>Todo-List</p>
        </div>
      </div>
      <div className="dropdown-cont">
        <div className="status-drop-cont">
          <h4>Status:</h4>
          <select
            name="status"
            id="status"
            value={statusFilter}
            onChange={filterStatus}
            className="status-drop"
          >
            <option value="all"> All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="status-drop-cont">
          <h4>Sort by:</h4>
          <select
            name="date"
            id="date"
            value={sortBy}
            onChange={sortType}
            className="status-drop"
          >
            <option value="all">Date(Desc)</option>
            <option value="date"> Date(Asc)</option>
            <option value="A-Z">A-Z(Title)</option>
          </select>
        </div>
      </div>

      <div className="body">
        <div className="task-cont">
          <table className="task-tb">
            <thead>
              <tr>
                <th>Action</th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date</th>
                <th>Edit | Delete</th>
              </tr>
            </thead>
            <tbody>
              <Tasks
                todoList={todoList}
                updateStatus={updateStatus}
                deleteTask={deleteTask}
                editButton={editButton}
                taskEditable={taskEditable}
                statusFilter={statusFilter}
                handleTaskTitleChange={handleTaskTitleChange}
                saveEditedTask={saveEditedTask}
                editedTask={editedTask}
                sortBy={sortBy}
              />
            </tbody>
          </table>
        </div>

        <div className="input-cont">
          <h3>Create a Task</h3>
          <label htmlFor="taskTitle">Task Title:</label>
          <div className="category-main">
            <div className="category-drop-cont">
              <h4>Category:</h4>
              <select
                name="status"
                id="status"
                value={category}
                onChange={handleCategory}
                className="category-drop"
              >
                <option value="Others">Others</option>
                <option value="Work">Work</option>
                <option value="School">School</option>
                <option value="Chores">Chores</option>
              </select>
            </div>
          </div>

          <input
            type="text"
            id="taskTitle"
            value={task}
            onChange={handleInputTitle}
            placeholder="Type here the title..."
          />

          <button className="add-btn" onClick={addTask}>
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}
