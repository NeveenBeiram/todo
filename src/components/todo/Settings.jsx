import React , {useContext} from 'react';
import {SettingsContext} from './setting-context';

import { Button,Form } from 'react-bootstrap';//


const ContentSetting = (props) =>{
    const context   = useContext (SettingsContext)

    const itemPerPageHandler = e =>{
        context.setItemPerPage (parseInt (e.target.value))
    }

const sortHandler=e=>{
    context.setSortBy(e.target.value.toString())
}//

const sortType=e=>{
    context.setSortType(e.target.value.toString())
}//

    return (
        <React.Fragment>
            <h2>Settings</h2>
            <Form style={{"width":"250px"}}>
            <Button variant="info"  style={{'width': '100%' , 'text-align' : 'center'  , }} onClick={context.toggle} >{context.finished? 'show all Tasks': 'hide Completed Tasks'}</Button >

            <Form.Label name="Sort By"> Sort By: 
            <select name="Sort By" title="Sort By" onChange={sortHandler}>
                    <option value="assignee" >assignee</option>
                    <option value="difficulty" >difficulty</option>
                    <option value="text" >text</option>
                </select>

                <select name="Sort By Type"  onChange={sortType}>
                    <option value="ascending" >ascending</option>
                    <option value="descending" >descending</option>
                </select>
            </Form.Label>
            {/* <input type="switch" name="complete" /> 
            <input type="switch" name="pending" /> 

            <input type="switch" name="difficultySort" />  */}
            <label name="itemPerPage">select Items per page </label>
            <input  type="number" id="itemPerPage" min="1" max="10" name="itemPerPage" onChange={itemPerPageHandler}/><br/>
            {/* <button type="submit"></button> */}
            </Form>
        </React.Fragment>
    )
}

export default ContentSetting;
