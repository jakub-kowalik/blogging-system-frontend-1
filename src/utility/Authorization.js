import axios from 'axios';

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

export const updateCurrentUser = ()=>{
    axios.get(
        'http://localhost:8081/users/currentUserInformation',
        { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}}
    ).then((response) => {
        if(response.status === 200) {
            let roles = response.data.roles.map(role => {
                return "ROLE_" + role.name;
            })
            console.log(roles.toString())
            localStorage.setItem("roles", roles.toString());
        } else {
            localStorage.setItem("roles", null);
        }

    }).catch(function (error) {
        console.log("Error updating current user data")
    });
    return localStorage.getItem('token') !== null;
}