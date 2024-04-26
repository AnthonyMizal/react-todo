import { Tasks } from "./components/helpers/Tasks";
import { useManageTodo } from "./components/helpers/useManageTodo";
import { useTodo } from "./components/helpers/store";
export function Todo() {
  const {
    inputRef,
    todoList,
    statusFilter,
    taskEditable,
    editedTask,
    category,
    task,
    inputTitleHandleChange,
    handleTaskTitleChange,
    deleteTask,
    editButton,
    updateStatus,
    saveEditedTask,
    filterStatus,
    chooseCategory,
  } = useManageTodo();

  const { addTask } = useTodo();

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

          <div className="form-cont">
            <div className="input-cont">
              <select
                name="category"
                id="status"
                value={category}
                onChange={chooseCategory}
                className="status-drop"
              >
                <option value="Other"> Other</option>
                <option value="Work">Work</option>
                <option value="School">School</option>
              </select>
              <input
                type="text"
                id="taskTitle"
                ref={inputRef}
                onChange={inputTitleHandleChange}
                placeholder="Type here the title..."
              />
            </div>

            <button
              className="add-btn"
              onClick={() => addTask(task.current, category)}
            >
              Add Task
            </button>
          </div>
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
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
