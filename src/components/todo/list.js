import React from 'react';
import If from './if';
import {useState} from 'react';
import  { Button } from 'react-bootstrap';
import { Badge ,Toast} from  'react-bootstrap';



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
  props.HandleEdit (newUpdate , id)
}


    return (
  <>
        {props.list.map(item => (
          <Toast
            className={`complete-${item.complete.toString()}`}
            key={item._id}
            onClose={() => props.deleteItem(item._id)}
          >
            <Toast.Header>
            <Badge pill variant={item.complete ? 'danger' : 'success'} > {item.complete ? 'completed' : 'pending'} </Badge>{' '}
            <strong className="mr-auto" style={{'margin-left': '20px' }}>{item.assignee}</strong>
            </Toast.Header>

<Toast.Body onClick={() => props.handleComplete(item._id)}>
<span>
{item.text}
</span>
<small className="float-right">
difficult:{item.difficulty}
</small>
</Toast.Body>

            <Button variant="outline-primary" onClick={()=>toggle(item._id)} value={item._id}>Edit</Button>
          </Toast>    
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
</>

    );

}

export default TodoList;