import React from 'react';
import styled from 'styled-components';

const Select2 = styled.select`
  background: transparent;
  font-size: 0.7em;
  font-weight: 300;
  border-radius: 22px;
  padding: 11px 27px;
  margin: auto;
  outline: none;
`

const Select = props =>{
  const options = props.options.map(op=>{
    return(
      <option
        key={op.label}
        label = {op.label}
        value = {op.value} 
      >
      </option>
    )
  })
  return(
    <Select2 multiple={props.multiple}> 
    {options}
    </Select2>
  )
};

export default Select;