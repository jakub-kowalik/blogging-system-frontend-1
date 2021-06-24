import axios from "axios";
import BlogEntry from "./BlogEntry";
import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {updateCurrentUser} from "../../utility/Authorization";

const BlogEntryPage = (props) => {
    const [entryPost, setPost] = useState(null)
    const [comments, setComments] = useState([]);

    const loadEntry = () => {
        axios.get(
            process.env.REACT_APP_BACKEND_URL + '/api/blog/getBlogEntryById?entryUUID=' + props.match.params.id
        ).then((response) => {
            console.log(response)
            if(response.status === 200) {
                setPost(response.data)
                return response.data
            }
        }).catch(function (error) {
            console.log("Error loading entry data")
            console.log(error);
        });
    }

    const loadComments = () => {
        axios.get(
            process.env.REACT_APP_BACKEND_URL + '/api/blog/getCommentsFromBlogEntry?entryUUID=' + props.match.params.id,
        ).then((response) => {
            if(response.status === 200) {
                setComments(response.data)
                return response.data
            }
        }).catch(function (error) {
            console.log("Error loading comments data")
            console.log(error);
        });
    }

    const addComment = async (parentId, comment) => {

        await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/blog/createComment?parentId=' + parentId, comment,
            { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
            .then((response) => {
                if (response.status === 201) {
                    toast.success("Comment added successfully!");
                    loadComments();
                } else {
                    alert('Error Adding comment')
                }
            }).catch(error => {
            toast.error("Can't add comment.");
            console.log(error);
        });
    }

    function isNull() {
        return (entryPost === null);
    }

    useEffect(()  => {
        updateCurrentUser();
        loadEntry();
        loadComments();
    }, [])

    return (
    <>
        {!isNull()
            ?
        <BlogEntry entryId={props.match.params.id} entryData={entryPost} comments={comments} addComment={addComment} socialUrl={window.location.href} />
            :
            <p>404 not found</p>
        }
    </>
    )
}
export default BlogEntryPage