import BlogObject from "./BlogObject";
import Comment from "./Comment";
import {handleError, isCurrentUserId, isRedactor, isUser} from "../../utility/Authorization";
import Socials from "./Socials";
import React, {useState} from "react";
import AddComment from "./AddComment";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import CustomModal from "../modal/CustomModal";
import {Container, Col, Row} from "react-bootstrap";

const BlogEntry = ({entryId, entryData, comments, addComment, isFrontpage, location}) => {
    const history = useHistory();
    const [addCommentBoolean, setAddCommentBoolean] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false);


    const shareUrl = location


    const toggleAddComment = () => {
        setAddCommentBoolean(!addCommentBoolean);
    }

    const editEntry = () => {
        if (entryData.author.id)
            history.push("/editblogentry/" + entryId);
    }

    const deleteEntry = () => {
        axios.delete(
            process.env.REACT_APP_BACKEND_URL + '/api/blog/redactor/deleteBlogEntry?entryUUID=' + entryId,
            {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}
        ).then((response) => {
            if (response.status === 204) {
                toast.success("Entry deleted successfully,")
                history.push('/home');
            }
        }).catch(function (error) {
            handleError(error, history);
        });
    }

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    function formatDate(dateString) {
        let date = new Date(dateString);
        return (date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear())
    }

    return (
        <>
            <article className={"text-start px-5 pt-3 pb-3 m-3 bg-light rounded-3"}>
                <header className="mb-4">

                    <h1 style={{wordWrap:"break-word"}} className="fw-bolder mb-1">{entryData.title}</h1>

                    <div className="text-muted fst-italic mb-2">Posted on <span
                        title={entryData.createdDate}>{formatDate(entryData.createdDate)}</span> by {entryData.author.username}
                    </div>
                </header>
                <hr/>
                <section>
                    {entryData.blogObjects
                        .sort((a, b) => a.positionInBlogEntry > b.positionInBlogEntry ? 1 : -1)
                        .map(blogObject => (
                            <BlogObject key={blogObject.positionInBlogEntry} blogObject={blogObject}/>))}
                </section>
                <hr/>
                <Container className={"w-100"}>
                    <Row>
                        <Col className={"my-auto"}>
                            {isUser() &&
                            <button className={"btn btn-primary mx-1"} onClick={() => toggleAddComment()}>Comment</button>
                            }
                            {isCurrentUserId(entryData.author.id) &&
                            <>
                                <button className={"btn btn-primary mx-1"} onClick={() => editEntry()}>Edit</button>
                                <button className={"btn btn-danger mx-1"} onClick={() => setShowDeleteModal(true)}>Delete</button>
                            </>
                            }
                        </Col>
                        <Col className={"my-auto"}>
                            <span className={"float-end"}>
                                <Socials shareUrl={shareUrl}/>
                            </span>
                        </Col>
                    </Row>
                </Container>
                <hr/>
            </article>
            {addCommentBoolean &&
            <AddComment parentId={entryId} addComment={addComment} toggleButton={toggleAddComment}/>
            }
            {!isFrontpage && comments !== null &&
            comments.map(comment => (<Comment key={comment.id} comment={comment}/>))
            }
            <CustomModal showModal={showDeleteModal} setShowModal={setShowDeleteModal}
                         onSuccess={deleteEntry}
                         header={"Do you really want to delete this entry?"}
                         body={"This action will be permanent!"}/>
        </>
    );
}

export default BlogEntry