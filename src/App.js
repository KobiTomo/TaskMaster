import { useState } from "react";
import "./styles.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { title, description };

    if (editIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === editIndex ? newTask : task
      );
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, newTask]);
    }

    setTitle("");
    setDescription("");
  };

  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setTitle(tasks[index].title);
    setDescription(tasks[index].description);
  };

  return (
    <div className="app-container">
      <h1>TaskMaster</h1>
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">
          {editIndex === null ? "Add Task" : "Update Task"}
        </button>
      </form>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <div className="task-actions">
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
