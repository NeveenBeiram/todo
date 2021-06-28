import React from 'react';
import If from './if';
import {useState} from 'react';

function TodoList (props) {
  const [flag , setFlag ] = useState(false);
const [id , setId] = useState ('');

const toggle = (id) =>{
  setFlag (!flag);
  setId (id)
}

const editor =e=>{
  e.preventDefault();
  toggle (id);
  let newUpdate = e.target.text.value
  props.editor (newUpdate , id)
}


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
            <button id="delete" onClick={() => props.deleteItem(item._id)} >Delete</button>
            <button onClick={()=>toggle(item._id)} value={item._id}>Edit</button>
          </li>    
        ))}
      <If condition={flag}>
  <form onSubmit={editor}>
    <label>
      <span>Edit Task</span>
      <input type="text" name="text"/>
    </label>
    <button type="submit">Submit Edit</button>
  </form>
      </If>
      </ul>

    );

}

export default TodoList;