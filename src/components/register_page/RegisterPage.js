import {useHistory, withRouter} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";


function RegisterPage() {
    const history = useHistory();

    const [state , setState] = useState({
        email : "",
        username : "",
        password : "",
        confirmPassword: ""
    });

    const sendDetailsToServer = () => {
        if(state.email.length && state.password.length && state.username.length) {
            const payload={
                "email":state.email,
                "password":state.password,
                "username": state.username,
            }
            axios.post(process.env.REACT_APP_BACKEND_URL + '/users/register', payload)
                .then(function (response) {
                    console.log(response);
                    if(response.status === 201){
                        toast.success("Registration successful.")
                        redirectToLogin();
                    }

                    else if (response.status === 500){
                        console.log(response);
                        toast.error("Registration failed");
                    }
                    else{
                        console.log(response);
                        toast.error("Some error ocurred");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    console.log("Email taken");
                    toast.error("Registration failed");

                });
        } else {
            toast.error('Please enter not null username, email and password')
        }

    }

    const handleChange = (e) => {
        const {id , value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const redirectToLogin = () => {
        history.push('/login');
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        let error = false;
        const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(!(state.password === state.confirmPassword)) {
            toast.error('Passwords do not match');
            error = true;
        } else if(!(state.username.length > 4)){
            toast.error('Username is too short');
            error = true;
        } else if(!state.email.match(mailformat)){
            toast.error('Email is not valid');
            error = true;
        } else if(!(state.password.length > 4)){
            toast.error('Password is too short');
            error = true;
        }
        if (!error){
            sendDetailsToServer();
        }
    }


    return(
        <div className="card mt-3 p-3">
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
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputUsername1">Username</label>
                    <input className="form-control"
                           type="text"
                           id="username"
                           placeholder="Username"
                           value={state.username}
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
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password"
                           className="form-control"
                           id="confirmPassword"
                           placeholder="Confirm Password"
                           value={state.confirmPassword}
                           onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                >
                    Register
                </button>
            </form>

        </div>
    )
}

export default withRouter(RegisterPage);



