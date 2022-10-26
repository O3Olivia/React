import React, { useState } from 'react';

import Button from '../../UI/Button/Button';
import './ToDoInput.css';

const ToDoInput = (props) => {
    const [enteredValue, setEnteredValue] = useState('');

    const toDoInputHandler = (e) => {
        setEnteredValue(e.target.value);
    };

    const formSubmitHandler = (e) => {
        e.preventDefault();
        props.onAddTodo(enteredValue);
    };

    return (
        <form onSubmit={formSubmitHandler}>
            <div className="form-control">
                <h2>Today's ToDo List 🌷</h2>
                <input type="text" onChange={toDoInputHandler}/>
            </div>
            <button type="submit"><i class="icon ion-md-lock"></i> ADD</button>
        </form>
    );
};

export default ToDoInput;