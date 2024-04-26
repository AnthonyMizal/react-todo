import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import { v4 as uuidV4 } from "uuid";
import { toast } from "sonner";
import { useStatusFilter, useTodo } from "./store";

export const useManageTodo = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const task = useRef<string>("");
  const [taskEditable, setEditable] = useState<string | null>(null);
  const [editedTask, setEditedTask] = useState<string>("");
  const storedTodoList = localStorage.getItem("todoList");
  const [category, setCategory] = useState<string>("Other");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const { statusFilter, setStatusFilter } = useStatusFilter();
  const { todoList, setTodoList } = useTodo();
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
      taskCategory: category,
      taskTitle: task.current,
      taskStatus: false,
    };
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

  const chooseCategory = (val: ChangeEvent<HTMLSelectElement>) => {
    setCategory(val.target.value);
  };

  const filterCategory = (val: ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(val.target.value);
  };

  return {
    inputRef,
    task,
    todoList,
    statusFilter,
    taskEditable,
    editedTask,
    storedTodoList,
    category,
    categoryFilter,
    inputTitleHandleChange,
    handleTaskTitleChange,
    addTask,
    deleteTask,
    editButton,
    updateStatus,
    saveEditedTask,
    filterStatus,
    setTodoList,
    chooseCategory,
    filterCategory,
  };
};
