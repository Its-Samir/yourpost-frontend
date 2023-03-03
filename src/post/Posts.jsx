import axios from 'axios';
import React, { useContext } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import Button from '../elements/Button';
import Comment from './Comment';
import Post from './Post';

function Posts() {

    const [posts, setPosts] = useState([]);
    const titleRef = useRef();
    const descriptionRef = useRef();
    const navigate = useNavigate();
    const ctx = useContext(AuthContext);

    async function sendPost(e) {
        e.preventDefault();

        if (titleRef.current.value === '' || descriptionRef.current.value === '') {
            return;
        }

        const post = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            userId: ctx.user._id
        }

        try {
            await axios.post('https://api-post-app.onrender.com/api/post', post);
            navigate('/');

        } catch (error) {
            // console.log(error);
        }

        titleRef.current.value = '';
        descriptionRef.current.value = '';
    }

    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await axios.get('https://api-post-app.onrender.com/api/allposts');
                setPosts(response.data.sort((prevPost, currentPost) => {
                    return new Date(currentPost.createdAt) - new Date(prevPost.createdAt);
                }));

            } catch (error) {
                // console.log(error);
            }
        }
        fetchPost();

    }, [posts]);

    return (
        <div className="content">

            <form className='form-control post-form' action="">
                <input placeholder='What is on you mind' ref={titleRef} type="text" />
                <input placeholder='Share some memories' ref={descriptionRef} type="text" />
                <Button title='post' onClick={sendPost} className="sendPostBtn">Post</Button>
            </form>

            {posts.map((eachPost) => {
                return <Post key={eachPost._id} comment={eachPost.comments.sort((prevComment, currentComment) => {
                    return new Date(currentComment.time) - new Date(prevComment.time);
                }).map((comment) => {
                    return <Comment key={comment.id} userId={comment.userId} username={comment.username} currentUser={ctx.user.username} comment={comment.content} time={comment.time} />;
                })} id={eachPost._id} title={eachPost.title} description={eachPost.description} userId={eachPost.userId} likes={eachPost.likes} createdAt={eachPost.createdAt} />

            })}

        </div>
    )
}

export default Posts;