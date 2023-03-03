import React from 'react'

function Button(props) {
    const btnClass = 'btn';
  return (
    <button title={props.title} onClick={props.onClick} className={`${btnClass} ${props.className}`}>{props.children}</button>
  )
}

export default Button;