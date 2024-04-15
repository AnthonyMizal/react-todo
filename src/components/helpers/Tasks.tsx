import React from "react";
import {
  BsFillTrashFill,
  BsCheckCircle,
  BsCheckCircleFill,
} from "react-icons/bs";
import { BiSolidMessageAltEdit } from "react-icons/bi";
import { FaSave } from "react-icons/fa";
import { TasksProps } from "../../Types";

export function Tasks({
  todoList,
  updateStatus,
  deleteTask,
  editButton,
  handleTaskTitleChange,
  saveEditedTask,
  taskEditable,
  statusFilter,
  editedTask,
  sortBy,
}: TasksProps) {
  const filteredTasks = todoList
    .filter((task) => {
      if (statusFilter === "completed") {
        return task.taskStatus;
      } else if (statusFilter === "pending") {
        return !task.taskStatus;
      }
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.taskDate);
      const dateB = new Date(b.taskDate);

      if (sortBy === "date") {
        return dateA.getTime() - dateB.getTime();
      } else if (sortBy === "all") {
        return dateB.getTime() - dateA.getTime();
      }

      return dateA.getTime() - dateB.getTime();
    });

  return (
    <>
      {filteredTasks.map((task) => (
        <tr key={task.taskID}>
          <td>
            {task.taskStatus ? (
              <button
                className="complete-btn"
                onClick={() => updateStatus(task.taskID)}
              >
                <BsCheckCircleFill color="#02d436" size={20} />
              </button>
            ) : (
              <button
                className="pending-btn"
                onClick={() => updateStatus(task.taskID)}
              >
                <BsCheckCircle color="red" size={20} />
              </button>
            )}
          </td>
          {taskEditable === task.taskID ? (
            <input
              value={editedTask}
              onChange={(e) => handleTaskTitleChange(e.target.value)}
            ></input>
          ) : (
            <td className="taskTitle">{task.taskTitle}</td>
          )}

          <td className="task-status-td">
            <div
              className="task-status"
              style={{
                color: task.taskStatus ? "green" : "red",
              }}
            >
              {task.taskStatus ? "Completed" : "Pending"}
            </div>
          </td>
          <td>{new Date(task.taskDate).toLocaleString()}</td>
          <td>
            {taskEditable === task.taskID ? (
              <button
                className="edit-btn"
                onClick={() => saveEditedTask(task.taskID)}
              >
                <FaSave color="green" size={17} />
              </button>
            ) : (
              <button
                className="edit-btn"
                onClick={() => editButton(task.taskID)}
              >
                <BiSolidMessageAltEdit color="#f5bd4e" size={17} />
              </button>
            )}

            <button
              className="delete-btn"
              onClick={() => deleteTask(task.taskID)}
            >
              <BsFillTrashFill color="#f76a54" size={17} />
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}
function elif(arg0: boolean) {
  throw new Error("Function not implemented.");
}
