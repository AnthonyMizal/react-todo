import { create } from "zustand";
import { StatusState } from "../../Types";
import { TaskTypes } from "../../Types";
import { v4 as uuidV4 } from "uuid";
import { toast } from "sonner";
type Todostore = {
  todoList: TaskTypes[];
  setTodoList: (tasks: TaskTypes[]) => void;
  addTask: (title: string, category: string) => void;
};

export const useStatusFilter = create<StatusState>((set) => ({
  statusFilter: "all",
  setStatusFilter: (val) => set({ statusFilter: val }),
}));

export const useTodo = create<Todostore>((set) => ({
  todoList: [],
  setTodoList: (tasks) => set({ todoList: tasks }),
  addTask: (title, category) =>
    set((state) => {
      const newTask = {
        taskID: uuidV4(),
        taskDate: new Date(),
        taskCategory: category,
        taskTitle: title,
        taskStatus: false,
      };

      if (newTask.taskTitle.trim() === "") {
        toast.error("Please enter a task title!");
        return { ...state };
      } else {
        toast.success("Task has been created.");
        return { todoList: [...state.todoList, newTask] };
      }
    }),
}));
