import React, {useEffect, useState} from "react";
import axios from "axios";
import UserBasicInfo from "./UserBasicInfo";
import {handleError} from "../../utility/Authorization";
import {useHistory} from "react-router-dom";

const UsersPage = () => {
    const history = useHistory();
    const [users, setUsers] = useState([]);


    useEffect(() => {
        axios.get(
            process.env.REACT_APP_BACKEND_URL + '/users/admin/getAllUsers',
            { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}}
        ).then((response) => {
            if(response.status === 200) {
                setUsers(response.data);
            }
        }).catch(function (error) {
            handleError(error, history)
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