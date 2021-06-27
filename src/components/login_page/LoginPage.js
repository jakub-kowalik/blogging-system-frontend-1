import React, {useState} from 'react';
import axios from 'axios';
import jwt from 'jwt-decode'
import {withRouter} from "react-router-dom";
import {toast} from "react-toastify";


function LoginForm() {
    const [state, setState] = useState({
        email: "",
        password: "",
    })
    const handleChange = (e) => {
        const {id, value} = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        const payload = {
            "email": state.email,
            "password": state.password,
        }
        axios.post(process.env.REACT_APP_BACKEND_URL + '/users/authenticate', payload)
            .then(function (response) {
                if (response.status === 200) {
                    localStorage.setItem("token", response.data['token']);
                    const decoded = jwt(localStorage.getItem('token'));
                    localStorage.setItem("roles", decoded['roles']);
                    toast.success("Logged in.");
                    redirectToHome();
                }
            })
            .catch(function (error) {
                toast.error("Invalid credentials");
            });
    }
    const redirectToHome = () => {
        window.location.replace('/');
    }

    return (
        <div className="card mt-3 p-3 w-50">
            <form>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email"
                           className="form-control"
                           id="email"
                           aria-describedby="emailHelp"
                           placeholder="Enter email"
                           value={state.email}
                           onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"
                           className="form-control"
                           id="password"
                           placeholder="Password"
                           value={state.password}
                           onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary form-control my-3"
                    onClick={handleSubmitClick}
                >Submit
                </button>
            </form>
        </div>
    )
}

export default withRouter(LoginForm);
