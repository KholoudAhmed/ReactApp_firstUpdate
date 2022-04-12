import React, { useState, useEffect } from 'react';

const triggerCheckedState = ({ id }, setTodos) => {
  setTodos((oldTodo) => {
    const updatedTodos = oldTodo.map((todo) => {
      if (todo.id !== id) return todo;
      return { ...todo, completed: !todo.completed };
    });
    return updatedTodos;
  });
};

const Todo = ({ todo, setTodos }) => {
  console.log('+++ in Todo id : ', todo.id);
  return (
    <>
      <input
        type="checkbox"
        checked={todo.completed}
        name={'todo' + todo.id}
        value={todo.id}
        onClick={(e) => triggerCheckedState(todo, setTodos)}
      />
      <label for={'todo' + todo.id}>{todo.note}</label>
      <br></br>
      <br></br>
    </>
  );
};

const Todos = ({ todos, setTodos, filter }) => {
  console.log('--- in Todos');

  return (
    <>
      {todos
        .filter(
          (todo) =>
            filter === 'all' ||
            (filter === 'completed' && todo.completed === true) ||
            (filter === 'active' && todo.completed === false)
        )
        .map((todo) => (
          <Todo setTodos={setTodos} key={todo.id} todo={todo} />
        ))}
    </>
  );
};

const Filter = ({ setFilter }) => {
  return (
    <>
      <br></br>
      <button className="btn-primary" onClick={() => setFilter('all')}>
        Show All
      </button>
      <button
        className="btn btn-secondary"
        onClick={() => setFilter('completed')}
      >
        Completed
      </button>
      <button className="btn btn-success" onClick={() => setFilter('active')}>
        Active
      </button>
    </>
  );
};

const handleClick = (setTodos, todo) => () => {
  setTodos((old) => [
    ...old,
    {
      id: old.length,
      note: todo,
      completed: false,
    },
  ]);
};

const TodoInput = ({ setTodos }) => {
  const [todo, inputTodo] = useState('');
  return (
    <>
      <input
        placeholder="please Enter Your item"
        onChange={(e) => inputTodo(e.target.value)}
      ></input>
      <button class="btn btn-danger" onClick={handleClick(setTodos, todo)}>
        Add Todo
      </button>
      <br></br>
      <br></br>
    </>
  );
};

function App() {
  const [filter, setFilter] = useState('all');
  const [todos, setTodos] = useState([]);

  return (
    <>
      <h1>ToDo List</h1>
      <TodoInput setTodos={setTodos} />
      <Todos {...{ todos, setTodos, filter }} />
      <Filter setFilter={setFilter} />
    </>
  );
}

export default App;
