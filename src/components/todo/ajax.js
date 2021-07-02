import axios from 'axios';
import { useState } from 'react';
let  todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

const useAjax = () => {
    const [list , setList] = useState ([]);
    
  const _addItem = (item) => {
    item.due = new Date();
        axios.post (todoAPI,item,{
            mode: 'cors',
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
              
            })
                .then(response => {
                  setList([...list, response.data])
                })
                .catch(console.error);
        
    }

  const _toggleComplete = (id)=>{

    let item = list.filter(i => i._id === id)[0] || {};
    if (item._id) {
        item.complete = !item.complete;
        const url2 = `${todoAPI}/${item._id}`
            axios.put (url2,item,{
                headers: { 'Content-Type': 'application/json' },
                data: JSON.stringify(item),
                cache:'no-cache',
                mode: 'cors', 
                })
            .then (response =>setList ( list.map(listItem => listItem._id === item._id ? response.data : listItem)))
            .catch(console.error);
    }
    
  }

    const _getTodoItems = async()=>{
            let response = await  axios.get (todoAPI,{
                headers: { 'Content-Type': 'application/json' },
                cache:'no-cache',
                mode: 'cors',
                  
                })
            setList (response.data.results)
     
    }

    const deleteItem =(id)=>{

        let item = list.filter(i => i._id === id)[0] || {};
        const url2 = `${todoAPI}/${item._id}`
            axios.delete (url2,{
                headers: { 'Content-Type': 'application/json' },
                cache:'no-cache',
                mode: 'cors',
                  
                }).then ((response)=>setList ( list.filter((item)=>item._id !== response.data.id) || {}))
      }

      const HandleEdit = (text , id)=>{
        let item = list.filter ((item)=> item._id === id)[0] || {}

        if (item) {
          item.text = text;
          list.map (itemE =>{
            if (itemE._id === id ){
              return item 
            }else {
              return itemE
            }
          })
        const url2 = `${todoAPI}/${item._id}`
          axios.put (url2,item ,{
              headers: { 'Content-Type': 'application/json' },
              cache:'no-cache',
              mode: 'cors',
              body: JSON.stringify(item)
                
              }).then (response =>setList ( list.map(listItem => listItem._id === item._id ? response.data : listItem)))
              .catch(console.error);

        }
       
      }

    return [list,_getTodoItems , _toggleComplete,_addItem ,deleteItem,HandleEdit];

}

export default useAjax;