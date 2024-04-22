import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [done, setDone] = useState(false);
  const [editTodo, setEditTodo] = useState(null);

  const handleAddTodo = () => {
    if (title.trim() !== "" && description.trim() !== "") {
      const newTodo = {
        title: title,
        description: description,
        done: done,
      };
      setTodos([...todos, newTodo]);
      setTitle("");
      setDescription("");
      setDone(false);
    }
  };
  const handleSaveTodo = () => {
    const newTodos = [...todos];
    newTodos[editTodo] = { title, description, done: todos[editTodo].done };
    setTodos(newTodos);
    setTitle("");
    setDescription("");
    setEditTodo(null);
  };
  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };
  const handleToggleDone = (index) => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  };
  const handleEditTodo = (index) => {
    setEditTodo(index);
    setTitle(todos[index].title);
    setDescription(todos[index].description);
  };

  return (
    <div
      style={{
        position: "absolute",
        transform: "translate(-50% , -50%)",
        left: "50%",
        top: "50%",
        fontFamily: "Arial",
        backgroundColor: "#f2f2f2",
        padding: "20px",
        borderRadius: "8px",
        width: "90%",
        maxWidth: "500px",
      }}
    >
      <h1 style={{ textAlign: "center", color: "black" }}>Todo App</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          marginBottom: "10px",
          padding: "5px",
          width: "100%",
          borderRadius: "5px",
        }}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{
          marginBottom: "10px",
          padding: "5px",
          width: "100%",
          borderRadius: "5px",
        }}
      />

      <button
        onClick={handleAddTodo}
        style={{
          marginBottom: "20px",
          padding: "10px",
          backgroundColor: "#4CAF50",
          color: "black",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        Add Todo
      </button>
      <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          >
            <span
              style={{
                textDecoration: todo.done ? "line-through" : "none",
                color: "black",
                flex: "1 1 auto",
             
              }}
            >
              <b>{todo.title}</b> <br/> {todo.description}
            </span>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => handleToggleDone(index)}
                style={{
                  marginLeft: "10px",
                  padding: "5px",
                  backgroundColor: todo.done ? "#f44336" : "#4CAF50",
                  color: "black",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                {todo.done ? "Mark as Undone" : "Mark as Done"}
              </button>
              <button
                onClick={() => handleEditTodo(index)}
                style={{
                  marginLeft: "10px",
                  padding: "5px",
                  backgroundColor: "gray",
                  color: "black",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                Edit
              </button>
              {editTodo !== null ? (
                ""
              ) : (
                <button
                  onClick={() => handleDeleteTodo(index)}
                  style={{
                    marginLeft: "10px",
                    padding: "5px",
                    backgroundColor: "#f44336",
                    color: "black",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      {editTodo === null ? "" : <button onClick={handleSaveTodo}>Save</button>}
    </div>
  );
}

export default App;
