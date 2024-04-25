import { create } from "zustand";
import { StatusState, Todostore } from "../../Types";

export const useStatusFilter = create<StatusState>((set) => ({
  statusFilter: "all",
  setStatusFilter: (val) => set({ statusFilter: val }),
}));

export const useTodo = create<Todostore>((set) => ({
  todoList: [],
  setTodoList: (tasks) => set({ todoList: tasks }),
}));
