import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useHistory} from "react-router-dom";
import {handleError} from "../../utility/Authorization";
import EditBlogEntry from "./EditBlogEntry";

const EditBlogEntryPage = (props) => {
    const history = useHistory();

    const entryId = props.match.params.id;
    const [blogEntry, setBlogEntry] = useState(null);


    useEffect(() => {
        getEntry()
    }, [])

    const getEntry = () => {
        axios.get(
            'http://localhost:8081/api/blog/getBlogEntryById?entryUUID=' + entryId,
            {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}
        ).then((response) => {
            if (response.status === 200) {
                setBlogEntry(response.data);
            }
        }).catch(function (error) {
            handleError(error, history);
        });
    }

    return (
        <>
            {
                blogEntry !== null && blogEntry !== undefined &&
                <EditBlogEntry blogEntry={blogEntry}
                               entryId={entryId}></EditBlogEntry>
            }
        </>
    )
}
export default EditBlogEntryPage;
