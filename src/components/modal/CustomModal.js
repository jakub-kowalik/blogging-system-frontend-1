import React from "react";
import {Button, Modal} from "react-bootstrap";

const CustomModal = ({showModal, setShowModal, onSuccess, header, body}) => {

    const cancelModal = () => {
        setShowModal(false);
    }
    const saveModal = () => {
        setShowModal(false);
        onSuccess();
    }

    return (
        <div>
            <Modal show={showModal} onHide={cancelModal} animation={false}>
                <Modal.Header>
                    <Modal.Title>{header}</Modal.Title>
                </Modal.Header>
                {body !== undefined && body !== "" && <Modal.Body>{body}</Modal.Body>}
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={cancelModal}>
                        Cancel
                    </Button>
                    <Button variant="outline-success" onClick={saveModal}>
                        Proceed
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CustomModal;