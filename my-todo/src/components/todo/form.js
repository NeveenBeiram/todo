import React ,{useState} from 'react';

import  { Button } from 'react-bootstrap';
import { Form} from  'react-bootstrap'

function TodoForm (props) {

//   constructor(props) {
//     super(props);
//     this.state = { item: {} };
//   }
const [item,setItem]=useState({});

  const handleInputChange = e => {
    setItem({...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    props.handleSubmit(item);
    const newItem = {};
    // this.setState({item});
    setItem(newItem)
  };


    return (
      <>
        <h3>Add Item</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="f">
            <Form.Label>
            <span>To Do Item</span>
<Form.Control  name="text"
              placeholder="Add To Do List Item"
              onChange={handleInputChange}/>
            </Form.Label>
          </Form.Group>
         
        <Form.Group controlId="f">
          <Form.Label>
            <span>Difficulty Rating</span>
<Form.Control variant="info" defaultValue="1" type="range" min="1" max="5" name="difficulty" onChange={handleInputChange} required/>
          </Form.Label>
        </Form.Group>
          
          <Form.Group controlId="f">
            <Form.Label>
            <span>Assigned To</span>
<Form.Control type="text" name="assignee" placeholder="Assigned To" onChange={handleInputChange}required/>
            </Form.Label>
          </Form.Group>
         
         <Form.Group controlId="f">
           <Form.Label>
          <span>Due Date</span>
<Form.Control type='date' name="dueDate" placeholder="Due Date" onChange={handleInputChange}required/>
           </Form.Label>
         </Form.Group>
         <Button variant="secondary">Add Item</Button>
  </Form>
      </>
    );
  }


export default TodoForm;