import React from 'react';


// import ToDo from './components/todo/todo.js';
import ToDo from './components/todo/todo-connected';
import Header from './components/todo/header'


export default function App () {
    return (
      <>
      <Header/>
        <ToDo />
      </>
    );
  }
