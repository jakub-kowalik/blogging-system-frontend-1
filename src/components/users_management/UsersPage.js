import React, {useEffect, useState} from "react";
import axios from "axios";
import UserBasicInfo from "./UserBasicInfo";
import {toast} from "react-toastify";

const UsersPage = () => {
    const [users, setUsers] = useState([]);


    useEffect(() => {
        axios.get(
            'http://localhost:8081/users/admin/getAllUsers',
            { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}}
        ).then((response) => {
            if(response.status === 200) {
                setUsers(response.data);
            }
        }).catch(function (error) {
            toast.error('Some error occured');
            console.log(error)
        });
    }, [])


    const deleteUserFromList = (id) => {
        const newList = users.filter((user) => user.id !== id);
        setUsers(newList);
    }

    return (
        <div>
            {users.map((user) =>
                <UserBasicInfo key={user.id} user={user} deleteUserFromList={deleteUserFromList}/>
            )}
        </div>
    )
}

export default UsersPage;