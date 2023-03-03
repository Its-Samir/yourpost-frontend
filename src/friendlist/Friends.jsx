import React from 'react';

function Friends(props) {
  return (
    <div className="friendDiv">
        <img src={props.img} alt={props.img} />
        <p>{props.username}</p>
    </div>
  )
}

export default Friends;