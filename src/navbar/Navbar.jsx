import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import Button from '../elements/Button';
import {IoNotificationsSharp} from 'react-icons/io5';

function Navbar() {
    const { user, dispatchUserState } = useContext(AuthContext);

    function logoutHandler() {
        dispatchUserState({ type: 'LOGOUT', user: null });
    }

    return (
        <nav className="navbar">
            <h1><Link id='logo' to='/'>logo</Link></h1>
            <ul className="list">
                {!user ? <><li><Link to={'/login'}><Button className='loginBtn'>Login</Button></Link></li>
                    <li><Link to={'/register'}><Button className='registerBtn'>Register</Button></Link></li></>
                    :
                    <>
                        <li><Link id='profileView' to={`/profile/${user.username}`}>Go to profile: You</Link></li>
                        <li><IoNotificationsSharp className='notifyIcon' /></li>
                        <li><Button onClick={logoutHandler} className='logoutBtn'>Logout</Button></li>
                    </>
                }
            </ul>
        </nav>
    )
}

export default Navbar;