import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import { v4 as uuidV4 } from "uuid";
import { TaskTypes } from "../../Types";
import { toast } from "sonner";

export const useManageTodo = () => {
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

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

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
      toast.error("Please enter a task title!");
    } else {
      setTodoList([...todoList, newTask]);
      task.current = "";
      toast.success("Task has been created.");
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const deleteTask = (id: string) => {
    const updatedTask = todoList.filter((todoList) => todoList.taskID !== id);
    setTodoList(updatedTask);
    toast.success("Task has been deleted.");
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
    toast.success("Task has been edited");
  };

  const filterStatus = (val: ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(val.target.value);
  };

  return {
    inputRef,
    task,
    todoList,
    statusFilter,
    taskEditable,
    editedTask,
    storedTodoList,
    inputTitleHandleChange,
    handleTaskTitleChange,
    addTask,
    deleteTask,
    editButton,
    updateStatus,
    saveEditedTask,
    filterStatus,
    setTodoList,
  };
};
