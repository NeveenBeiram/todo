import React from 'react';
import If from './if';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Badge, Toast } from 'react-bootstrap';

import { SettingsContext } from './setting-context';
import { Pagination } from 'react-bootstrap'

import { useContext } from 'react';

function TodoList(props) {
  const [flag, setFlag] = useState(false);
  const [id, setId] = useState('');


  const context = useContext(SettingsContext)

  const maxItems = context.itemPerPage;

  const [currentPage, setCurrentPage] = useState(1);

  const numOfPages = props.list.length / maxItems + 1;
  const last = currentPage * context.itemPerPage;
  const first = last - context.itemPerPage;
  const currentTasks = props.list.slice(first, last);

  let active = currentPage;
  let items = [];
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

      <Pagination>
        <Pagination.Prev disabled={active === 1 ? true : false}
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
        />
        {items}
        <Pagination.Next disabled={active > numOfPages - 1 ? true : false}
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        />
      </Pagination>

      <If condition={flag}>
        <form onSubmit={editor}>
          <label>
            <span>Edit Task</span>
            <input type="text" name="text" />
          </label>
          <button type="submit">Submit Edit</button>
        </form>
      </If>
    </>

  );

}

export default TodoList;