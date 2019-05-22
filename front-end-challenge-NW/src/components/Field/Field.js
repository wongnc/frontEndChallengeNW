import React from 'react';

function field(props) {

  function select() {
    return (
      <select defaultValue={props.data.default ? props.data.default:props.data.content[0].value}
              className={`${props.data.classlist.field} ${props.data.classlist.select}`}
              name={props.data.title}>
        {props.data.content.map((option, i) => <option key={i} value={option.value}> {option.value.capitalize()} </option>)}
      </select>
    );
  }

  function input() {
    return (
      <input defaultValue={props.data.default ? props.data.default:''}
             className={props.data.classlist.field}
             name={props.data.title}
             type='text'/>
    );
  }

  //runs input or select function based on content length
  const view = props.data.content.length > 1 ? select : input;
  
  return (
    <label className={props.data.classlist.label}>
      {props.data.title.capitalize()}:
      {view()}
    </label>
  );
};

export default field;
