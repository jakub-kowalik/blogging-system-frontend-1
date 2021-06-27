import axios from "axios";
import React, {useState} from "react";
import {Button} from "react-bootstrap";
import CustomModal from "../modal/CustomModal";
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";
import {handleError, updateCurrentUser} from "../../utility/Authorization";


const UserBasicInfo = ({user, index, deleteUserFromList}) => {
    const history = useHistory();
    const [roles, setRoles] = useState(user.roles);

    const [showPromoteModal, setShowPromoteModal] = useState(false);
    const [showDemoteModal, setShowDemoteModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);


    const deleteUser = () => {
        axios.delete(
            process.env.REACT_APP_BACKEND_URL + '/users/admin/deleteUser?userId=' + user.id,
            {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}
        ).then((response) => {
            if (response.status === 204) {
                toast.success("User's account deleted!");
                deleteUserFromList(user.id);
            }
        }).catch(function (error) {
            handleError(error, history);
        });
    }

    const promoteUserToRedactor = () => {
        axios.post(
            process.env.REACT_APP_BACKEND_URL + '/users/admin/promoteUserToRedactor?userId=' + user.id, "",
            {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}
        ).then((response) => {
            if (response.status === 200) {
                toast.success("User promoted to redactor!");
                setRoles([...roles, "REDACTOR"]);
            }
        }).catch(function (error) {
            handleError(error, history);
        });
    }

    const demoteRedactorToUser = () => {
        axios.post(
            process.env.REACT_APP_BACKEND_URL + '/users/admin/demoteRedactorToUser?userId=' + user.id, "",
            {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}
        ).then((response) => {
            if (response.status === 200) {
                toast.success("User demoted to user!");
                setRoles(roles.filter(item => item !== "REDACTOR")); // delete redactor from list
            }
        }).catch(function (error) {
            handleError(error, history);
        });
    }

    return (
            <tr>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.id}</td>
                <td>{roles.toString()}</td>
                <td>
                    {
                        !roles.includes("REDACTOR") &&
                        <Button variant="outline-primary" onClick={() => setShowPromoteModal(true)}>
                            Promote to redactor
                        </Button>
                    }
                    {
                        roles.includes("REDACTOR") &&
                        <Button variant="outline-secondary" onClick={() => setShowDemoteModal(true)}>
                            Demote to user
                        </Button>
                    }
                    <Button variant="outline-danger" onClick={() => setShowDeleteModal(true)}>
                        Delete user's account
                    </Button>
                    <CustomModal showModal={showPromoteModal} setShowModal={setShowPromoteModal}
                                 onSuccess={promoteUserToRedactor}
                                 header={"Do you want to promote " + user.username + " to redactor?"}/>
                    <CustomModal showModal={showDemoteModal} setShowModal={setShowDemoteModal}
                                 onSuccess={demoteRedactorToUser}
                                 header={"Do you want to demote " + user.username + " to user?"}/>
                    <CustomModal showModal={showDeleteModal} setShowModal={setShowDeleteModal}
                                 onSuccess={deleteUser}
                                 header={"Do you want to delete " + user.username + " account?"}
                                 body={"This action will be permanent!"}/>
                </td>
            </tr>)
}

export default UserBasicInfo;