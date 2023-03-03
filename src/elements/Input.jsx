import React, { forwardRef } from 'react';

const Input = forwardRef((props, ref) => {
  return (
    <input required={props.required} onChange={props.onChange} ref={ref} placeholder={props.placeholder} type={props.type} />
  );
});

export default Input;