import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import { v4 as uuidV4 } from "uuid";
import { TaskTypes } from "./Types";
import { Tasks } from "./components/helpers/Tasks";
import Swal from "sweetalert2";
import { log } from "console";

export function Todo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const task = useRef<string>("");
  const [todoList, setTodoList] = useState<TaskTypes[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
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
      text: "Please type a task title!",
      icon: "error",
      confirmButtonText: "OK",
    });
  }

  const inputTitleHandleChange = () => {
    if (inputRef.current) {
      task.current = inputRef.current.value;
    }
  };

  const handleTaskTitleChange = (newTitle: string) => {
    setEditedTask(newTitle);
  };

  const addTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTask = {
      taskID: uuidV4(),
      taskDate: new Date(),
      taskTitle: task.current,
      taskStatus: false,
    };

    if (newTask.taskTitle.trim() === "") {
      swalError();
    } else {
      setTodoList([...todoList, newTask]);
      task.current = "";
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const deleteTask = (id: string) => {
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
  };

  const editButton = (id: string) => {
    if (editedTask === id) {
      setEditable(null);
    } else {
      setEditable(id);
      const taskToEdit = todoList.find((task) => task.taskID === id);
      if (taskToEdit) {
        setEditedTask(taskToEdit.taskTitle);
      }
    }
  };

  const updateStatus = (id: string) => {
    setTodoList(
      todoList.map((task) => {
        if (task.taskID === id) {
          return { ...task, taskStatus: !task.taskStatus };
        }
        return task;
      })
    );
  };

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

  const filterStatus = (val: ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(val.target.value);
  };

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
        <div className="dropdown-scont">
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

          <form className="input-cont" onSubmit={addTask}>
            <input
              type="text"
              id="taskTitle"
              ref={inputRef}
              onChange={inputTitleHandleChange}
              placeholder="Type here the title..."
            />
            <button className="add-btn" type="submit">
              Add Task
            </button>
          </form>
        </div>
      </div>

      <div className="body">
        <div className="task-cont">
          <table className="task-tb">
            <thead>
              <tr>
                <th>Action</th>
                <th>Title</th>
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
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
