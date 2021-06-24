import React, {useEffect, useState} from "react";
import axios from "axios";
import UserBasicInfo from "./UserBasicInfo";
import {handleError} from "../../utility/Authorization";
import {useHistory} from "react-router-dom";
import {Table} from "react-bootstrap";

const UsersPage = () => {
    const history = useHistory();
    const [users, setUsers] = useState([]);


    useEffect(() => {
        axios.get(
            process.env.REACT_APP_BACKEND_URL + '/users/admin/getAllUsers',
            {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}
        ).then((response) => {
            if (response.status === 200) {
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
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>ID</th>
                    <th>Roles</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) =>
                    <UserBasicInfo key={user.id} index={index} user={user} deleteUserFromList={deleteUserFromList}/>
                )}
                </tbody>
            </Table>
        </div>
    )
}

export default UsersPage;