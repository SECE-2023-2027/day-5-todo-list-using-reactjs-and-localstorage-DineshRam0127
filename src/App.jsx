import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');

  // Save to localStorage when todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add task
  const addTask = () => {
    if (task.trim() === '') return;
    setTodos([...todos, task.trim()]);
    setTask('');
  };

  // Delete task
  const deleteTask = (index) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
  };

  // Start editing
  const startEdit = (index) => {
    setEditIndex(index);
    setEditText(todos[index]);
  };

  // Save edited task
  const saveEdit = () => {
    if (editText.trim() === '') return;
    const updated = [...todos];
    updated[editIndex] = editText.trim();
    setTodos(updated);
    setEditIndex(null);
    setEditText('');
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditIndex(null);
    setEditText('');
  };

  return (
    <div className="container">
      <h1>📝 Todo List</h1>

      {/* Add Task Section */}
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter your task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      {/* Todo List */}
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={saveEdit}>✅</button>
                <button onClick={cancelEdit}>❌</button>
              </>
            ) : (
              <>
                {todo}
                <button onClick={() => startEdit(index)}>✏️</button>
                <button onClick={() => deleteTask(index)}>🗑️</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
