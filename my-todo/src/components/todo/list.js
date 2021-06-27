import React from 'react';

function TodoList (props) {
    return (
      <ul>
        {props.list.map(item => (
          <li
            className={`complete-${item.complete.toString()}`}
            key={item._id}
          >
            <span onClick={() => props.handleComplete(item._id)}>
            📄{item.text}: 🙎🏻‍♀️{item.assignee} /🔎difficult:{item.difficulty}/📅 Due-Date:{item.dueDate}
            </span>
            <button id="delete" onClick={() => props.deleteItem(item._id)} >X</button>
  
          </li>
        ))}
      </ul>
    );

}

export default TodoList;