import axios from "axios";
import BlogEntry from "./BlogEntry";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {updateCurrentUser} from "../../utility/Authorization";

const BlogEntryPage = (props) => {
    const [entryPost, setPost] = useState(null)
    const [comments, setComments] = useState([]);

    const loadEntry = () => {
        axios.get(
            'http://localhost:8081/api/blog/getBlogEntryById?entryUUID=' + props.match.params.id
        ).then((response) => {
            console.log(response)
            if(response.status === 200) {
                setPost(response.data)
                return response.data
            }
        }).catch(function (error) {
            console.log("Error updating current user data")
            console.log(error);
        });
    }

    const loadComments = () => {
        axios.get(
            'http://localhost:8081/api/blog/getCommentsFromBlogEntry?entryUUID=' + props.match.params.id,
        ).then((response) => {
            if(response.status === 200) {
                setComments(response.data)
                return response.data
            }
        }).catch(function (error) {
            console.log("Error updating current user data")
            console.log(error);
        });
    }

    const addComment = async (parentId, comment) => {

        await axios.post('http://localhost:8081/api/blog/createComment?parentId=' + parentId, comment,
            { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
            .then((response) => {
                if (response.status === 201) {
                    toast.success("Comment added successfully!");
                    loadComments();
                } else {
                    alert('Error Updating This Product')
                }
            }).catch(error => {
            toast.error("Can't add comment.");
            console.log(error);
        });
    }

    function isNull() {
        return (entryPost === null);
    }

    useEffect(() => {
        updateCurrentUser();
        loadEntry()
        loadComments()
    }, [])

    return (
    <>
        {!isNull()
            ?
        <BlogEntry entryId={props.match.params.id} entryData={entryPost} comments={comments} addComment={addComment} location={window.location.href} />
            :
            <p>404 not found</p>
        }
    </>
    )
}
export default BlogEntryPage