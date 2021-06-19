import axios from 'axios';
import {toast} from "react-toastify";

export const isRedactor = () => {
    let roles = localStorage.getItem('roles');
    return roles!==null && roles.includes("ROLE_REDACTOR");
}

export const isUser = () => {
    let roles = localStorage.getItem('roles');
    return roles!==null && roles.includes("ROLE_USER");
}

export const isAdmin = () => {
    let roles = localStorage.getItem('roles');
    return roles!==null && roles.includes("ROLE_ADMIN");
}

export const isCurrentUserId = (id) => {
    let currentUserId = localStorage.getItem('currentUserId');
    console.log(currentUserId);
    return currentUserId!==null && currentUserId === id;
}

export const updateCurrentUser = () => {
    axios.get(
        'http://localhost:8081/users/currentUserInformation',
        { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}}
    ).then((response) => {
        if(response.status === 200) {
            let roles = response.data.roles.map(role => {
                return "ROLE_" + role.name;
            })
            localStorage.setItem("roles", roles.toString());
            localStorage.setItem("currentUserId", response.data.id);
        } else {
            localStorage.setItem("currentUserId", null);
            localStorage.setItem("roles", null);
        }

    }).catch(function (error) {
        console.log("Error updating current user data")
        console.log(error);
    });
    return localStorage.getItem('token') !== null;
}

export const handleError = (error, history) => {
    if (error.response) {
        if(error.response.status === 401){
            toast.error("Your session timed out. Try re-logging to your account.");
            updateCurrentUser();
            history.push('/home');
        }
        else if (error.response.status === 500) {
            toast.error('Server error');
        }
    } else {
        toast.error('Some error occured');
        console.log(error);
    }
}