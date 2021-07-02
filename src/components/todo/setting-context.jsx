import React , {useState} from 'react';
export const SettingsContext = React.createContext();
const SettingsProvider = (props) =>{
    const [itemPerPage , setItemPerPage] = useState (3);
    const [taskSum, setTaskSum] = useState(0);

    const [finished , setFinished] = useState (true);//
    const [sortBy , setSortBy] = useState ('');//
    const [sortType , setSortType]  =useState('ascending')//


    function toggle(){
        setFinished(finished=>!finished)
    }//

    const setting = {
        itemPerPage,
        setItemPerPage,
        taskSum,
        setTaskSum,
        toggle,
        sortBy,
        setSortBy,
        sortType,
        setSortType,
        finished,
        setFinished

    }
    return (
        <SettingsContext.Provider value={setting}>
            {props.children}
        </SettingsContext.Provider>
    )
}
export default SettingsProvider;
