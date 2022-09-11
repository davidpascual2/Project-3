import React, { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    let requestBody = {
        query: `
          query Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              userId
              token
              tokenExpiration
            }
          }
        `,
        variables: { email, password }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:8000/graphql', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await res.json();
            localStorage.setItem('token', result.data.login.token);
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
        }
    };

    if (localStorage.getItem('token')) {
        return <Navigate to='/dashboard' />
    };

    return (
        <div className='login_main'>
            <div className='container' >
                <div className='row justify-content-center login_page '>
                    <div className='col-md-5 shadow p-5 bg-white'>
                        <h4 className='text-center'>HomeGuru</h4>
                        <h4 className='pb-5 text-center'>Sign in to your HomeGuru Account! </h4>
                        <form onSubmit={handleLogin} className="row g-3 ">
                            <div className='text-end'>
                                <a href="http://" target="_blank" rel="noopener noreferrer">Forgot Username?</a>
                            </div>
                            <div className="col-md-12 mb-3">
                                <input required placeholder='Email' type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className='text-end'>
                                <a href="http://" target="_blank" rel="noopener noreferrer">Forgot password?</a>
                            </div>
                            <div className="col-md-12 mb-3">
                                <input required placeholder='Password' type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="col-12 text-center">
                                <button type="submit" className="btn btn-primary">Sign in</button>
                            </div>
                            <div className='text-center'>
                                <a href="http://" target="_blank" rel="noopener noreferrer">Need Help? Talk to Us!</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Login;
