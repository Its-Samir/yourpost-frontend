import React from 'react';

import Posts from '../post/Posts';
import { Users } from '../dummyData';
import Friends from '../friendlist/Friends';

function Home() {
  return (
    <>

      <div className="container">
        <div className="leftBar">
          <div className="leftBarWrapper">
            {/* <img src="./assets/friends-list.png" alt="friendlist-img" /> */}
            {Users.map((user) => {
              return <Friends key={user.id} username={user.username} img={`./assets/${user.profilePicture}`} />;
            })}

          </div>
        </div>
        <div className="feedBar">
          <div className="feedBarWrapper">
            <Posts />
          </div>
        </div>
        <div className="rightBar">
          <div className="rightBarWrapper">
          <img src="./assets/gift.png" alt="" className="giftImg" />
           <p>Today <strong>{Users[Math.floor(Math.random() * Users.length)].username} and {Math.floor(Math.random() * 20)+1} others</strong> posted some new content.</p>
            <img className='adsImg' src="./assets/ad.png" alt="ad-img" />
            <img className='adsImg' src="./assets/post/5.jpeg" alt="ad-img" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;