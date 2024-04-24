export type TaskTypes = {
  taskID: string;
  taskDate: Date;
  taskTitle: string;
  taskStatus: boolean;
};

export type TasksProps = {
  todoList: TaskTypes[];
  statusFilter: string;
  editedTask: string;
  taskEditable: string | null;
  editButton: (id: string) => void;
  updateStatus: (id: string) => void;
  deleteTask: (id: string) => void;
  handleTaskTitleChange: (id: string) => void;
  saveEditedTask: (id: string) => void;
};


