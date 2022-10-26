import React, {useState} from 'react';

import ToDoInput from './components/ToDo/ToDoInput/ToDoInput';
import ToDoList from './components/ToDo/ToDoList/ToDoList';

import './App.css';

const App = () => {
  const [toDoLists, setToDoLists] = useState([
    { text: 'Finish the course', id: 'l1'},
    { text: 'Do some exercise', id: 'l2'}
  ]);

  const addToDoHandler = (enteredText) => {
    setToDoLists(prevTodos => {
      const updatedToDos = [...prevTodos];
      updatedToDos.unshift({text:enteredText, id: Math.random().toString()});
      return updatedToDos;
    });
  };

  const deleteHandler = (todoId) => {
    setToDoLists(prevTodos => {
      const updatedToDos = prevTodos.filter(todo => todo.id !== todoId);
      return updatedToDos;
    });
  };

  let content = (
    <p style={{textAlingh: 'center'}}>NO TO DO LIST FOUND. ADD NEW ONE</p>
  );

  if (toDoLists.length > 0) {
    content = (
    <ToDoList items={toDoLists} onDeleteItem={deleteHandler}/>
    );
  }

  return (
    <div>
      <section id ="todo-form">
        <ToDoInput onAddTodo={addToDoHandler}/>
        <hr style={{marginBottom: '50px'}}/>
        {content}
      </section>
    </div>
  );
};

export default App;