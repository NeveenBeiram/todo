import React from 'react';
import {useContext} from 'react';
import If from './components/todo/if.jsx'
import { AuthContext } from './components/todo/auth-context';


// import ToDo from './components/todo/todo.js';
import ToDo from './components/todo/todo-connected';
import Header from './components/todo/header'


export default function App () {
  const context  = useContext(AuthContext);
    return (
      <>
      <Header/>
        <If condition={context.loggedIn}>
        <ToDo />
        </If>
      </>
    );
  }


