import React, { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import Moment from 'react-moment';
import Button from '../elements/Button';
import { SlLike } from 'react-icons/sl';
import { FaRegComment } from 'react-icons/fa';
import { AiOutlineRetweet } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import DeleteModal from '../elements/DeleteModal';
import {MdDeleteOutline} from 'react-icons/md';

function Post(props) {
    const commentRef = useRef();
    const [showComment, setShowComment] = useState(false);
    const [isValidComment, setIsValidComment] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [users, setUsers] = useState({});
    const [like, setLike] = useState(props.likes.length);
    const ctx = useContext(AuthContext);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    function showCommentHandler() {
        setShowComment((prevValue) => !prevValue);
    }

    function sendComment(e) {
        e.preventDefault();

        if (commentRef.current.value === '') {
            setIsValidComment('Write some comment');
            return;
        }

        const comment = {
            comment: commentRef.current.value,
            userId: ctx.user._id,
            username: ctx.user.username
        }

        try {
            axios.post('https://api-post-app.onrender.com/api/' + props.id + '/comment', comment);
        } catch (error) {
            console.log(error);
        }

        commentRef.current.value = '';
    }

    useEffect(() => {
        setIsLiked(props.likes.includes(ctx.user._id));
    }, [props.likes, ctx.user._id]);

    function likeHandler() {
        try {
            axios.put('https://api-post-app.onrender.com/api/' + props.id + '/like', { userId: ctx.user._id });
        } catch (error) {
            console.log(error);
        }
        setIsLiked((prevValue) => !prevValue);
        setLike(isLiked ? like - 1 : like + 1);
    }

    useEffect(() => {
        async function getProfile() {
            try {
                const res = await axios.get('https://api-post-app.onrender.com/auth/profile?userId=' + props.userId);
                setUsers(res.data);

            } catch (error) {
                console.log(error);
            }
        }
        getProfile()
    }, [props.userId]);

    function handleChange() {
        setIsValidComment(null);
    }

    async function deletePost() {
        // in axios.delete() method we cannot post/pass/send extra information to the backend like {userId: props.userId} etc, so we are using post method to delete a post
        const res = await axios.post('https://api-post-app.onrender.com/api/delete/' + props.id, {userId: ctx.user._id});
    }

    function openOrCloseDeleteModal() {
        setOpenDeleteModal(prevValue => !prevValue)
    }
    
    const hideDivClass = showComment ? 'showCommentDiv' : '';

    return (
        <>
            <>
                <div onClick={showCommentHandler} className={`commentsOverlay ${hideDivClass}`}></div>
                <div className={`commentDiv ${hideDivClass}`}>
                    <form className='form-control comment-form' action="">
                        <input onChange={handleChange} placeholder='add a comment' ref={commentRef} type="text" />
                        {isValidComment && <p className='invalid-form-error'>{isValidComment}</p>}
                        <Button title='post' onClick={sendComment} className='commentBtn'>Post</Button>
                    </form>
                    {/* Here we will get <Comment /> Component through this props.comment for every comment along with its time of every post (the mapping is in the <Posts /> Component) */}
                    {props.comment.length === 0 ? 'No comments yet' : props.comment}
                </div>
            </>

            <div className="postDiv">
                <div className="postUpperDiv">
                    <img id='postProfileImg' src="/assets/defaultProfileImg.png" alt="default-profile-img" />
                    <p className='post-time'>
                        - <Link className='usernameFromPosts' to={'/profile/' + users.username}><span>{users.username}</span></Link> -
                        posted on <Moment format='MMM Do YYYY, h:mm a'>{props.createdAt}</Moment>
                    </p>
                    
                    {props.userId === ctx.user._id && <span title='delete' onClick={openOrCloseDeleteModal} style={{color: 'red', marginLeft: 'auto', cursor: 'pointer'}}><MdDeleteOutline /></span>}
                    
                    {openDeleteModal && <DeleteModal onClose={openOrCloseDeleteModal} onDelete={deletePost} />}
                </div>
                <h2>{props.title}</h2>
                <p>{props.description}</p>
                <div className="actionTab">
                    <div className='likeDiv'>
                        <SlLike id='likeIcon' title='like' onClick={likeHandler} />
                        <p>{like} people liked it.</p>
                    </div>
                    <AiOutlineRetweet />
                    <p title='comment' className='commentPara' onClick={showCommentHandler}><FaRegComment /> {props.comment.length} comments</p>
                </div>

            </div>

        </>
    )
}

export default Post;