import React from 'react';

import  { Button } from 'react-bootstrap';
import { Form} from  'react-bootstrap';
import useForm from './formHook';

// import ContentSetting from './Settings.jsx';

function TodoForm (props) {

//   constructor(props) {
//     super(props);
//     this.state = { item: {} };
//   }

const [handleInputChange,handleSubmit]=useForm(callBack);

function callBack (item){
props.handleSubmit(item);
}

    return (
      <>
        <Form style={{"marginRight":"40px",'box-shadow': '0 4px 5px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.12)',"width":"250px","padding":"50px"}} onSubmit={handleSubmit}>
        <h3 style={{"marginBottom":"50px"}}>Add Item</h3>
          <Form.Group controlId="f">
            <Form.Label>
            <span>Item description</span>
<Form.Control  name="text" placeholder="Add To Do List Item"onChange={handleInputChange}/>
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
         
         {/* <Form.Group controlId="f">
           <Form.Label>
          <span>Due Date</span>
<Form.Control type='date' name="dueDate" placeholder="Due Date" onChange={handleInputChange}required/>
           </Form.Label>
         </Form.Group> */}
         <Button variant="info" style={{width:"50%"}} type="submit">Add Item</Button>
  </Form>
  {/* <ContentSetting /> */}
      </>
    );
  }


export default TodoForm;