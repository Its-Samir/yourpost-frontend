import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Users } from '../dummyData';
import Friends from '../friendlist/Friends';
import Comment from '../post/Comment';
import Post from '../post/Post';


function Profile(props) {
    const [users, setUsers] = useState({});
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(false);
    // This param we are getting from App Component where this Profile link is path='/profile/:username', so .username is from there
    const params = useParams().username;

    useEffect(() => {
        async function getProfile() {
            setError(false);
            try {
                const res = await axios.get('https://api-post-app.onrender.com/auth/profile?username=' + params);
                setUsers(res.data);

            } catch (error) {
                setError(true);
            }
        }
        getProfile();

        async function getPosts() {
            try {
                const res = await axios.get('https://api-post-app.onrender.com/api/userprofile/allposts?username=' + params);
                setPosts(res.data);

            } catch (error) {
                console.log(error);
            }
        }
        getPosts();
    }, [params]);


    return (
        <>
            <div className="profileBanner">
                <div className="profileImg"><img src="/assets/defaultProfileImg.png" alt="default-profile-img" /></div>
                <span className="username">{users.username}</span>
            </div>
            <div className="profileWrapper">
                {error ? <h1 className='timeLineHeading'>No user found with this username</h1> :
                    <>
                        <div className="feedBar">
                            <h1 className='timeLineHeading'>{users.username === props.username ? 'Your' : `${users.username}'s`} Timeline</h1>
                            <div className="feedBarWrapper">
                                {posts.length === 0 && users.username !== props.username ? <p className='noPostParagraph'>No posts from this user yet.</p> : posts.length === 0 && users.username === props.username && <p className='noPostParagraph'>You have not posted anything.</p>}

                                {posts.length > 0 && posts.map((post) => {
                                    return <Post key={post._id} id={post._id} comment={post.comments.map((comment) => {
                                        return <Comment key={comment.id} userId={comment.userId} comment={comment.content} time={comment.time} />
                                    })} title={post.title} description={post.description} userId={post.userId} createdAt={post.createdAt} likes={post.likes} />
                                })}
                            </div>
                        </div>
                        <div className="rightBar">
                            <h4 className='friendListHeading'>{props.username === users.username ? 'Your Friends list' : 'Friends list of this user'}</h4>
                            <div className="rightBarWrapper">
                                {Users.map((user) => {
                                    return <Friends key={user.id} username={user.username} img={`/assets/${user.profilePicture}`} />
                                })}
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default Profile;