import React from 'react';
import If from './if';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Badge, Toast ,Form} from 'react-bootstrap';

import { SettingsContext } from './setting-context';
import { Pagination } from 'react-bootstrap'

import { useContext } from 'react';

function TodoList(props) {
  const [flag, setFlag] = useState(false);
  const [id, setId] = useState('');

  let list=props.list;//

  const context = useContext(SettingsContext)

  const maxItems = context.itemPerPage;

  const [currentPage, setCurrentPage] = useState(1);

if(context.finished){
  list =list.filter((task)=>!task.complete);
}//

  // let numOfPages = props.list.length / maxItems + 1;
  const last = currentPage * context.itemPerPage;
  const first = last - context.itemPerPage;


  // const currentTasks = props.list.slice(first, last);
if(context.sortType==='descending'){
  if(context.sortBy==='difficulty'){
    list.sort((a,b)=>{
      if(a.difficulty> b.difficulty)return -1;
      else if(a.difficulty< b.difficulty)return 1;
      else if(a.difficulty===b.difficulty)return 0;
    })
  }else if(context.sortBy==='assignee'){
    list.sort((a,b)=>{
      if(a.text.toLowerCase() > b.text.toLowerCase())return -1
      else if (a.text.toLowerCase() < b.text.toLowerCase() ) return 1
      else if (a.text.toLowerCase()  === b.text.toLowerCase() ) return 0
    })
  }
  else if (context.sortBy === 'text'){
    list.sort ((a,b)=> {
        if (a.text.toLowerCase()  > b.text.toLowerCase() ) return -1
        else if (a.text.toLowerCase() < b.text.toLowerCase() ) return 1
        else if (a.text.toLowerCase()  === b.text.toLowerCase() ) return 0
    })
  }
}
else if (context.sortType === 'ascending'){
  if (context.sortBy === 'difficulty'){
    list.sort ((a,b)=> {
      if (a.difficulty && b.difficulty){
        if (a.difficulty > b.difficulty) return 1
        else if (a.difficulty < b.difficulty) return -1
        else if (a.difficulty === b.difficulty) return 0
      }
    })
  }
  else if (context.sortBy === 'assignee'){
    list.sort ((a,b)=> {
        if (a.assignee.toLowerCase()  > b.assignee.toLowerCase() ) return 1
        else if (a.assignee.toLowerCase() < b.assignee.toLowerCase() ) return -1
        else if (a.assignee.toLowerCase()  === b.assignee.toLowerCase() ) return 0
    })
  }
  else if (context.sortBy === 'text'){
    list.sort ((a,b)=> {
        if (a.text.toLowerCase()  > b.text.toLowerCase() ) return 1
        else if (a.text.toLowerCase() < b.text.toLowerCase() ) return -1
        else if (a.text.toLowerCase()  === b.text.toLowerCase() ) return 0
    })
  }
}

let currentTasks = list.slice(first, last);//
let numOfPages = list.length / maxItems ;//
context.setTaskSum(list.length);//
// console.log('current',currentTasks.length,'list',props.list.length);

  let active = currentPage;
  let items = [];
  // console.log('numOfPage',numOfPages,'active',active);
  for (let number = 1; number <= numOfPages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    );
  }


  const toggle = (id) => {
    setFlag(!flag);
    setId(id)
  }

  const editor = e => {
    e.preventDefault();
    toggle(id);
    let newUpdate = e.target.text.value
    props.HandleEdit(newUpdate, id)
  }


  return (
    <>
      {currentTasks.map(item => (
        <Toast
          className={`complete-${item.complete.toString()}`}
          key={item._id}
          onClose={() => props.deleteItem(item._id)}
          value={item._id}
        >
          <Toast.Header>
            <Badge pill variant={item.complete ? 'danger' : 'success'} > {item.complete ? 'completed' : 'pending'} </Badge>{' '}
            <strong className="mr-auto" style={{ 'margin-left': '20px' }}>{item.assignee}</strong>
          </Toast.Header>

          <Toast.Body onClick={() => props.handleComplete(item._id)}>
            <span>
              {item.text}
            </span>
            <small className="float-right">
              difficult:{item.difficulty}
            </small>
          </Toast.Body>

          <Button variant="outline-primary" onClick={() => toggle(item._id)} value={item._id}>Edit</Button>
        </Toast>
      ))}


      <Pagination size="sm">
        <Pagination.Prev size="sm" disabled={active === 1 ? true : false}
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
        />
        {items}
        <Pagination.Next size="sm" disabled={active > numOfPages - 1 ? true : false}
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        />
      </Pagination>

      <If condition={flag}>
        <Form onSubmit={editor}>
          <Form.Label>
            <span>Edit Task</span>
            <input type="text" name="text" />
          </Form.Label>
          <Button variant="outline-secondary" type="submit">Submit Edit</Button>
        </Form>
      </If>
    </>

  );

}

export default TodoList;