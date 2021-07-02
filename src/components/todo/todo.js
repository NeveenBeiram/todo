import React,{useState,useEffect} from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';

import './todo.scss';


function ToDo (props) {

//   constructor(props) {
//     super(props);
//     this.state = {
//       list: [],
//     };
//   }
const [list,setList]=useState([]);
// const [hide,setHide]=useState(false);//
// const [update,setUpdate]=useState('');//
// const [itemToEdit,setItemToEdit]=useState({});

// const toggle=(id)=>{
//     setHide(!hide);
//     setId(id)
    
//   }
//   const submitUpdate = (e) => {
//     e.preventDefault();
//     toggle(id);
//     console.log(props);
//     props.editeItem(update);
//   };//

  const addItem = (item) => {
    item._id = Math.random();
    item.complete = false;
    setList([...list, item]);
  };

  const toggleComplete = (id) => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;
      let nList = list.map((listItem) => listItem._id === item._id ? item : listItem);
    //   this.setState({list});
    setList(nList);
    }

  };

const deleteItem=(id)=>{
    let nList=list.filter((i)=> i._id !==id)|| {};
    setList(nList);
}

const editor = (text , id)=>{
  let item = list.filter ((item)=> item._id === id)[0] || {}
  if (item) {
    item.text = text;
    let listE = list.map (itm =>{
      if (itm._id === id ){
        return item 
      }else {
        return itm
      }
    })
    setList (listE)
  }
 
 
  }



  useEffect(()=>{
    let nlist = [
      { _id: 1, complete: false, text: 'Clean the Kitchen', difficulty: 3, assignee: 'Person A'},
      { _id: 2, complete: false, text: 'Do the Laundry', difficulty: 2, assignee: 'Person A'},
      { _id: 3, complete: false, text: 'Walk the Dog', difficulty: 4, assignee: 'Person B'},
      { _id: 4, complete: true, text: 'Do Homework', difficulty: 3, assignee: 'Person C'},
      { _id: 5, complete: false, text: 'Take a Nap', difficulty: 1, assignee: 'Person B'},
    ];

    setList(nlist);
  },[]);

  useEffect(() => {
    window.document.title = `ToDo ${list.filter((item) => !item.complete).length}`;
  }, [list]);
  
    return (
      <>
        <header>
          <h2>
          There are {list.filter(item => !item.complete).length} Items To Complete
          </h2>
        </header>

        <section className="todo">

          <div>
            <TodoForm handleSubmit={addItem} />
          </div>

          <div>
            <TodoList
              list={list}
              handleComplete={toggleComplete}
              deleteItem={deleteItem}
              editor={editor}
            />
          </div>
        </section>
      </>
    );
  
}

export default ToDo;