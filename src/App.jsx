import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]); // State for storing todos
  const [title, setTitle] = useState(""); // State for storing todo title
  const [description, setDescription] = useState(""); // State for storing todo description
  const [done, setDone] = useState(false); // State for storing todo completion status
  const [editTodo, setEditTodo] = useState(null); // State for storing the index of the todo being edited

  const handleAddTodo = () => {
    if (title.trim() !== "" && description.trim() !== "") {
      const newTodo = {
        title: title,
        description: description,
        done: done,
      };
      setTodos([...todos, newTodo]); // Add new todo to the todos array
      setTitle(""); // Clear the title input field
      setDescription(""); // Clear the description input field
      setDone(false); // Reset the completion status
    }
  };

  const handleSaveTodo = () => {
    const newTodos = [...todos];
    newTodos[editTodo] = { title, description, done: todos[editTodo].done };
    setTodos(newTodos); // Update the todos array with the edited todo
    setTitle(""); // Clear the title input field
    setDescription(""); // Clear the description input field
    setEditTodo(null); // Reset the editTodo state
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index); // Remove the todo at the specified index
    setTodos(updatedTodos); // Update the todos array
  };

  const handleToggleDone = (index) => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done; // Toggle the completion status of the todo at the specified index
    setTodos(newTodos); // Update the todos array
  };

  const handleEditTodo = (index) => {
    setEditTodo(index); // Set the index of the todo being edited
    setTitle(todos[index].title); // Set the title input field value to the title of the todo being edited
    setDescription(todos[index].description); // Set the description input field value to the description of the todo being edited
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
              <b>{todo.title}</b> <br /> {todo.description}
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
