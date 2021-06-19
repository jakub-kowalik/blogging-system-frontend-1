import axios from "axios";
import React, {useState} from "react";
import {Button} from "react-bootstrap";
import CustomModal from "../modal/CustomModal";
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";
import {updateCurrentUser} from "../../utility/Authorization";


const UserBasicInfo = ({user, deleteUserFromList}) => {
    const history = useHistory();
    const [roles, setRoles] = useState(user.roles);

    const [showPromoteModal, setShowPromoteModal] = useState(false);
    const [showDemoteModal, setShowDemoteModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);


    const deleteUser = () => {
        axios.delete(
            'http://localhost:8081/users/admin/deleteUser?userId=' + user.id,
            {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}
        ).then((response) => {
            if (response.status === 204) {
                toast.success("User's account deleted!");
                deleteUserFromList(user.id);
            }
        }).catch(function (error) {
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
        });
    }

    const promoteUserToRedactor = () => {
        axios.post(
            'http://localhost:8081/users/admin/promoteUserToRedactor?userId=' + user.id, "",
            {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}
        ).then((response) => {
            if (response.status === 200) {
                toast.success("User promoted to redactor!");
                setRoles([...roles, "REDACTOR"]);
            }
        }).catch(function (error) {
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
                toast.error('Something went wrong');
                console.log(error);
            }
        });
    }

    const demoteRedactorToUser = () => {
        axios.post(
            'http://localhost:8081/users/admin/demoteRedactorToUser?userId=' + user.id, "",
            {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}
        ).then((response) => {
            if (response.status === 200) {
                toast.success("User demoted to user!");
                setRoles(roles.filter(item => item !== "REDACTOR")); // delete redactor from list
            }
        }).catch(function (error) {
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
                toast.error('Something went wrong');
                console.log(error);
            }
        });
    }

    return (
        <div>
            <p>{user.username} i jego id = {user.id} i role = {roles}</p>
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
        </div>
    )
}

export default UserBasicInfo;