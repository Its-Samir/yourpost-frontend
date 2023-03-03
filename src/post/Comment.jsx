import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

function Comment(props) {
    return (
        <div className="comment">
            <p><span><Link className='userProfileLinkFromComment' to={`/profile/${props.username}`}>{props.username === props.currentUser ? 'You' : props.username}</Link></span> - {props.comment}</p>
            <p> - posted on <Moment format='MMM, Do YYYY'>{props.time}</Moment></p>
        </div>
    )
}

export default Comment;