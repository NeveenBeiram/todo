import { useState } from 'react';

const useForm = (callBack) => {
    const [item,setItem]=useState({});

    const handleInputChange = e => {
      setItem({...item, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      e.target.reset();
      callBack(item);
    };
    return [handleInputChange,handleSubmit];
}

export default useForm;