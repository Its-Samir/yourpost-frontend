import React from 'react';
import { useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../elements/Button';
import { useState } from 'react';
import Input from '../elements/Input';

function Register() {

    const usernameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const [formErrorMessage, setFormErrorMessage] = useState(null);
    const [isValidDetail, setIsValidDetail] = useState(null);

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
            await axios.post('https://api-post-app.onrender.com/auth/register', user)
            navigate('/login');

            // await fetch('http://localhost:5000/auth/register', {
            //     method:'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(user)
            // });
        } catch (error) {
            setIsValidDetail(error.response.data);
        }
    }

    function handleChange() {
        setFormErrorMessage(null);
        setIsValidDetail(null);
    }

    return (
        <>
            <div className="registerDiv">
                <div className="registerWrapper">
                    <h2>Register</h2>
                    <div className="formDiv">
                        <form action="" className="form-control register-form">
                            {/* <input onChange={handleChange} placeholder='Enter username' ref={usernameRef} required type="text" />
                            <input onChange={handleChange} placeholder='Enter password' ref={passwordRef} required type="password" /> */}
                            <Input onChange={handleChange} placeholder='Enter username' ref={usernameRef} required={true} type='text' />
                            <Input onChange={handleChange} placeholder='Enter password' ref={passwordRef} required={true} type='password' />
                            {formErrorMessage && <p className='invalid-form-error'>{formErrorMessage}</p>}
                            {isValidDetail && <p className='invalid-form-error'>{isValidDetail}</p>}
                            <Button onClick={submitHandler} className="registerBtn">Register</Button>
                        </form>
                        Already have an account? Let's <Link to={'/login'}>Sign In.</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;