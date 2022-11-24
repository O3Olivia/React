import React from "react";

import "./ToDoItem.css";

const ToDoItem = (props) => {
  // const [deleteText, setDeleteText] = useState('');

  const deleteHandler = () => {
    // setDeleteText('(Deleted!)');
    props.onDelete(props.id);
    console.log("i CLICKED");
  };

  return (
    <li className="todo-item" onClick={deleteHandler}>
      {props.children}
    </li>
  );
};

export default ToDoItem;
