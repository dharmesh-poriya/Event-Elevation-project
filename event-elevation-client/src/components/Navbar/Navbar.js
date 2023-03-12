import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../../assets/images/logos/logo.png';
import { BASE_URL } from '../../config';
import { useCookies } from 'react-cookie';

const initialStateSignUp = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
}

const initialStateSignIn = {
    email: '',
    password: ''
}

const Navbar = () => {
    const navigate = useNavigate();

    const [signUpData, setSignUpData] = useState(initialStateSignUp);
    const [signInData, setSignInData] = useState(initialStateSignIn);

    const [cookies, setCookie, removeCookie] = useCookies(['userId', 'jwttoken']);

    const handleSubmitSignUp = async (event) => {
        console.log("SignUp : ", signUpData);
        event.preventDefault();
        const formData = new FormData();
        formData.append('Name', signUpData.firstName + ' ' + signUpData.lastName);
        formData.append('Email', signUpData.email);
        formData.append('Password', signUpData.password);

        await axios.post(BASE_URL + '/api/Users', formData)
            .then((res) => {
                console.log(res.data)
                res && toast.success("registration successful");
                navigate('/');
            }).catch((error) => {
                error.response.data && toast.error(error.response.data);
            })

    }
    const handleChangeSignUp = (e) => {
        setSignUpData({ ...signUpData, [e.target.name]: e.target.value })
    }

    const handleSubmitSignIn = async (event) => {
        console.log("SignIn : ", signInData);
        event.preventDefault();
        const formData = new FormData();
        formData.append('Username', signInData.email);
        formData.append('Password', signInData.password);

        await axios.post(BASE_URL + '/api/Users/login', formData)
            .then((res) => {
                // console.log("SIgn In Res : ",res);
                const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Expires in 1 hour
                setCookie('userId', res.data.userId, { path: '/', expires });
                setCookie('jwttoken', res.data.token, { path: '/', expires });
                toast.success("Login successful");
                window.location.href = '/';
                // navigate('/');
            }).catch((err) => {
                console.log("Error", err)
                toast.error(err.response.data);
            });

    }
    const handleChangeSignIn = (e) => {
        setSignInData({ ...signInData, [e.target.name]: e.target.value })
    }
    const handleLogout = () => {
        removeCookie('userId');
        removeCookie('jwttoken');
        toast.success("Logout successful");
        window.location.href = '/';
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/"><img src={logo} width="30" height="30" alt='event-elevation logo' /></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {
                    window.innerWidth > 991 && <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                }
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 mx-5">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/allevents">Events</a>
                        </li>
                        {!cookies['jwttoken'] || !cookies['userId'] ?
                            <>
                                <li className="nav-item mx-3">
                                    <button className="nav-link btn btn-link btn-light" data-bs-toggle="modal" data-bs-target="#loginModel">Login</button>

                                    <div className="modal fade" id="loginModel" tabIndex="-1" aria-labelledby="loginModelLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="loginModelLabel">Sign In</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <form onSubmit={handleSubmitSignIn} method={'post'} id='sign-in-form'>
                                                    <div className="modal-body">
                                                        <input type='email' className='form-control mb-3' name='email' placeholder='Enter Email' required='required' onChange={handleChangeSignIn} />
                                                        <input type='password' className='form-control mb-3' name='password' placeholder='Enter Password' required='required' onChange={handleChangeSignIn} />
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="submit" className="btn btn-primary">Save changes</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link btn btn-link btn-light" data-bs-toggle="modal" data-bs-target="#signUpModel">SignUp</button>

                                    <div className="modal fade" id="signUpModel" tabIndex="-1" aria-labelledby="signUpModelLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="signUpModelLabel">Sign Up</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <form onSubmit={handleSubmitSignUp} method={'post'} id='sign-up-form'>
                                                    <div className="modal-body">
                                                        <input type='text' className='form-control mb-3' name='firstName' placeholder='Enter First Name' required='required' onChange={handleChangeSignUp} />
                                                        <input type='text' className='form-control mb-3' name='lastName' placeholder='Enter Last Name' required='required' onChange={handleChangeSignUp} />
                                                        <input type='email' className='form-control mb-3' name='email' placeholder='Enter Email' required='required' onChange={handleChangeSignUp} />
                                                        <input type='password' className='form-control mb-3' name='password' placeholder='Enter Password' required='required' onChange={handleChangeSignUp} />
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="submit" className="btn btn-primary">Save changes</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </>
                            :
                            <li className="nav-item mx-3">
                                <button className="nav-link btn btn-link btn-warning" onClick={handleLogout}>LogOut</button>
                            </li>
                        }

                    </ul>
                    {
                        window.innerWidth <= 991 && <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    }

                </div>
            </div>
        </nav>
    )
}

export default Navbar