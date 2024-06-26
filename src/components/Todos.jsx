import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../features/todo/todoSlice";

const Todos = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null); // State to track which todo is being edited
  const [editText, setEditText] = useState(''); // State to store the updated text

  const handleEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  const handleUpdate = () => {
    dispatch(updateTodo({ id: editId, text: editText }));
    setEditId(null);
    setEditText('');
  };

  return (
    <>
      <div>Todos</div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={handleUpdate}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {todo.text}
                <button onClick={() => dispatch(removeTodo(todo.id))}>X</button>
                <button onClick={() => handleEdit(todo)}>Update</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todos;
