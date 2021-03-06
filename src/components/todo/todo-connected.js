import React, { useEffect } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import useAjax from './ajax';
import {Badge} from 'react-bootstrap';

import ContentSetting from './Settings.jsx';//

import './todo.scss';
import Acl from './acl.jsx'

// const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

const ToDo = () => {

const[list,_getTodoItems , _toggleComplete,_addItem ,deleteItem,HandleEdit]=useAjax();

useEffect (_getTodoItems , [_getTodoItems]);
document.title = `Tasks to complete : ${list.filter((item) => !item.complete).length}`;
 

return (
    <>
      {/* <header>
        <h2>
          There are {list.filter(item => !item.complete).length} Items To Complete
        </h2>
      </header> */}
      <header>
       <h2>
        <Badge variant="dark"  style={{'width': '96%' ,'margin' : '2%' , 'boarder-radios' : 'none' , 'padding' : '20px 30px' , 'text-align' : 'left'}}>
          There are {list.filter(item => !item.complete).length} Items not completed
        </Badge>
        </h2>
      </header>

      <section className="todo">

        <Acl capability="create">
        <div>
          <TodoForm handleSubmit={_addItem} />
        </div>
        </Acl>

{/*  */}
        <div>
          <ContentSetting />
        </div>
{/*  */}
        <div>
          <TodoList
            list={list}
            handleComplete={_toggleComplete}
            deleteItem={deleteItem}
            HandleEdit={HandleEdit}
          />
        </div>
      </section>
    </>
  );
};

export default ToDo;