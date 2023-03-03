import React from 'react';
import Button from './Button';

function DeleteModal(props) {
  return (
    <>
    <div onClick={props.onClose} className="deleteOverlay"></div>
    <div className="deleteModal">
        <h3>Are you sure?</h3>
        <div className="actions">
            <Button onClick={props.onClose}>Cancel</Button>
            <Button onClick={props.onDelete} className='deleteBtn'>Delete</Button>
        </div>
    </div>
    </>
  )
}

export default DeleteModal;