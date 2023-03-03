import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { useReducer } from 'react';
// import { AuthReducer } from '../AuthReducer';
import { AuthContext } from '../AuthContext';
import Button from '../elements/Button';
import Input from '../elements/Input';

function Login() {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const [formErrorMessage, setFormErrorMessage] = useState(null);
    const [isValidDetail, setIsValidDetail] = useState(null);

    const { dispatchUserState } = useContext(AuthContext);

    async function submitHandler(e) {
        e.preventDefault();
        const user = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        }
        if (user.username === '' || user.password === '') {
            setFormErrorMessage('Fields must not be empty.');
            return;
        }

        try {
            // another way with axios
            const response = await axios.post('https://api-post-app.onrender.com/auth/login', user);
            dispatchUserState({ type: 'LOGIN', user: response.data });

            navigate('/');

            // await fetch('http://localhost:5000/auth/register', {
            //     method:'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(user)
            // });
        } catch (error) {
            if (error.response.data.error) {
                setIsValidDetail(error.response.data);
            } else {
                setIsValidDetail(error.response.data);
            }
        }
    }

    function handleChange() {
        setFormErrorMessage(null);
        setIsValidDetail(null);
    }

    return (
        <>
            <div className="loginDiv">
                <div className="loginWrapper">
                    <h2>Login</h2>
                    <div className="formDiv">
                        <form action="" className="form-control login-form">
                            {/* <input onChange={handleChange} placeholder='Your username' ref={usernameRef} required type="text" />
                            <input onChange={handleChange} placeholder='Your password' ref={passwordRef} required type="password" /> */}
                            <Input onChange={handleChange} placeholder='Your username' ref={usernameRef} required={true} type='text' />
                            <Input onChange={handleChange} placeholder='Your password' ref={passwordRef} required={true} type='password' />
                            {formErrorMessage && <p className='invalid-form-error'>{formErrorMessage}</p>}
                            {isValidDetail && <p className='invalid-form-error'>{isValidDetail}</p>}
                            <Button onClick={submitHandler} className="loginBtn">Login</Button>
                        </form>
                        No account with logo? Let's <Link to={'/register'}>Sign Up.</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;