import React from 'react'


const ValidationErrors = ({errors}) =>{

  return (
    <ul className='validation-errors'>
        {errors.map( (err, index) => {return <li  key={index}>{err}</li>}  )}
    </ul>
  );

}


export default ValidationErrors;