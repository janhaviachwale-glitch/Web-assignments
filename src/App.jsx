
import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editDescription, setEditDescription] = useState("");

  // Add a new task.
  function handleAddTodo(event) {
    event.preventDefault();

    const todo = {
      id: crypto.randomUUID(),
      description: newTodo,
      completed: false,
    };

    setTodos((currentTodos) => [...currentTodos, todo]);
    setNewTodo("");
  }

  // Start editing a pending task.
  function handleEditStart(todo) {
    if (todo.completed) return;

    setEditingId(todo.id);
    setEditDescription(todo.description);
  }

  // Confirm the edit.
  function handleEditConfirm(id) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id
          ? { ...todo, description: editDescription }
          : todo
      )
    );

    setEditingId(null);
    setEditDescription("");
  }

  // Cancel without changing the original description.
  function handleEditCancel() {
    setEditingId(null);
    setEditDescription("");
  }

  // Complete a task. Completed tasks cannot be undone.
  function handleCompleteTodo(id) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id && !todo.completed
          ? { ...todo, completed: true }
          : todo
      )
    );
  }

  // Delete only completed tasks.
  function handleDeleteTodo(id) {
    const todo = todos.find((item) => item.id === id);

    if (!todo || !todo.completed) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this completed task?"
    );

    if (!confirmed) return;

    setTodos((currentTodos) =>
      currentTodos.filter((item) => item.id !== id)
    );
  }

  // Completed tasks first, followed by pending tasks.
  const orderedTodos = [
    ...todos.filter((todo) => todo.completed),
    ...todos.filter((todo) => !todo.completed),
  ];

  // Apply the selected filter.
  const filteredTodos = orderedTodos.filter((todo) => {
    if (activeFilter === "completed") return todo.completed;
    if (activeFilter === "pending") return !todo.completed;
    return true;
  });

  const filters = [
    { label: "All", value: "all" },
    { label: "Done", value: "completed" },
    { label: "Todo", value: "pending" },
  ];

  return (
    <main className="todo-app">
      <h1 className="section-title">TodoInput</h1>

      <form className="todo-input-card" onSubmit={handleAddTodo}>
        <div className="input-row">
          <span className="input-symbol" aria-hidden="true">
            ▤
          </span>

          <input
            type="text"
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
            placeholder="New Todo"
            aria-label="New Todo description"
          />

        </div>

        <button className="add-button" type="submit">
          Add new task
        </button>
      </form>

      <h2 className="section-title list-title">TodoList</h2>

      {todos.length > 0 && (
        <div className="filter-buttons" aria-label="Todo filters">
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              className={`filter-button ${
                activeFilter === filter.value ? "selected" : ""
              }`}
              aria-pressed={activeFilter === filter.value}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      )}

      <section className="todo-list" aria-label="Todo list">
        {filteredTodos.length === 0 ? (
          <p className="empty-message">No todo is available</p>
        ) : (
          filteredTodos.map((todo) => (
            <article className="todo-item" key={todo.id}>
              {editingId === todo.id ? (
                <form
                  className="edit-form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleEditConfirm(todo.id);
                  }}
                >
                  <input
                    className="edit-input"
                    type="text"
                    value={editDescription}
                    onChange={(event) =>
                      setEditDescription(event.target.value)
                    }
                    aria-label="Edit todo description"
                    autoFocus
                  />

                  <div className="edit-actions">
                    <button className="confirm-button" type="submit">
                      Confirm
                    </button>

                    <button
                      className="cancel-button"
                      type="button"
                      onClick={handleEditCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <span
                    className={`todo-description ${
                      todo.completed ? "completed" : ""
                    }`}
                  >
                    {todo.description}
                  </span>

                  <div className="todo-actions">
                    <input
                      className="complete-checkbox"
                      type="checkbox"
                      checked={todo.completed}
                      disabled={todo.completed}
                      onChange={() => handleCompleteTodo(todo.id)}
                      aria-label={`Complete ${todo.description}`}
                    />

                    {!todo.completed && (
                      <button
                        className="edit-button"
                        type="button"
                        onClick={() => handleEditStart(todo)}
                      >
                        Edit
                      </button>
                    )}

                    {todo.completed && (
                      <button
                        className="delete-button"
                        type="button"
                        onClick={() => handleDeleteTodo(todo.id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </>
              )}
            </article>
          ))
        )}
      </section>
    </main>
  );
}

export default App;
