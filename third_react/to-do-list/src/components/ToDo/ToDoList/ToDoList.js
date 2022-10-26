import React from 'react';

import ToDoItem from '../ToDoItem/ToDoItem';

import './ToDoList.css';

const ToDoList = (props) => {
    return (
        <ul className="todo-list">
            {props.items.map(todo => (
                <ToDoItem
                    key={todo.id}
                    id={todo.id}
                    onDelete={props.onDeleteItem}
                    >
                    {todo.text}
                </ToDoItem>
            ))}
        </ul>        
    );
};

export default ToDoList;