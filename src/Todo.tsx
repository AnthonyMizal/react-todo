import { Tasks } from "./components/helpers/Tasks";
import { useManageTodo } from "./components/helpers/useManageTodo";
export function Todo() {
  const {
    inputRef,
    todoList,
    statusFilter,
    taskEditable,
    editedTask,
    inputTitleHandleChange,
    handleTaskTitleChange,
    addTask,
    deleteTask,
    editButton,
    updateStatus,
    saveEditedTask,
    filterStatus,
  } = useManageTodo();

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
