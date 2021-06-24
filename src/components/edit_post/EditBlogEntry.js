import React, {useEffect, useState} from "react";
import EditBlogEntryObject from "./EditBlogEntryObject";
import update from 'immutability-helper';
import axios from "axios";
import {toast} from 'react-toastify';
import {useHistory} from "react-router-dom";
import {handleError} from "../../utility/Authorization";

const EditBlogEntry = ({blogEntry, entryId}) => {
    const history = useHistory();

    const [title, setTitle] = useState("");
    const [count, setCount] = useState(0);
    const [blogEntryObjects, setBlogEntryObjects] = useState([]);

    useEffect(() => {
        console.log(blogEntry);
        if(blogEntry) {
            setTitle(blogEntry.title);
            setBlogEntryObjects(blogEntry.blogObjects);
            const positionsArray = blogEntry.blogObjects.map(object => object.positionInBlogEntry);
            setCount(Math.max.apply(Math, positionsArray) + 1);
        }
    }, []);


    const config = {
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    };

    const updateBlogObject = (updatedObject) => {
        const index = blogEntryObjects.findIndex((blogObject) => blogObject.positionInBlogEntry === updatedObject.positionInBlogEntry);
        const updatedObjects = update(blogEntryObjects, {$splice: [[index, 1, updatedObject]]});
        setBlogEntryObjects(updatedObjects);
    }

    const onDelete = (positionInBlogEntry) => {
        const newList = blogEntryObjects.filter((object) => object.positionInBlogEntry !== positionInBlogEntry);
        setBlogEntryObjects(newList);
    }

    const isValidData = () => {
        if (title.length < 5) {
            toast.error("Include a title that's at least 5 characters long.");
            return false;
        }
        if (blogEntryObjects.length === 0) {
            toast.error("Your blog entry must have content.");
            return false;
        }

        for (const object of blogEntryObjects) {
            if (object.type === "paragraph" && object.content.length < 20) {
                toast.error("All your paragraphs must be at least 20 characters long.");
                return false;
            } else if (object.type === "photo" && object.content.length < 15) {
                toast.error("All your photos must have a valid link.");
                return false;
            } else if (object.type !== "photo" && object.type !== "paragraph") {
                toast.error("Something went wrong :/")
                return false;
            }
        }
        return true;
    }

    const addBlogEntry = () => {
        if (isValidData()) {
            if(!blogEntry)
                postBlogEntry();
            else
                updateBlogEntry();
        }
    }

    const updateBlogEntry = () => {
        const payload = {
            title: title,
            blogObjects: blogEntryObjects
        }
        axios.put(process.env.REACT_APP_BACKEND_URL + '/api/blog/redactor/updateBlogEntry?entryUUID=' + entryId, payload,
            config
        ).then((response) => {
            if (response.status === 200) {
                toast.success("Blog entry updated!");
                history.push('/post/' + response.data);
            }
        }).catch((error) => {
            handleError(error, history);
        });

    }

    const postBlogEntry = () => {
        const payload = {
            title: title,
            blogObjects: blogEntryObjects
        }
        axios.post(process.env.REACT_APP_BACKEND_URL + '/api/blog/redactor/createBlogEntry', payload,
            config
        ).then((response) => {
            if (response.status === 201) {
                toast.success("Blog entry created!");
                history.push('/post/' + response.data);
            }
        }).catch((error) => {
            handleError(error, history);
        });

    }

    const addNewBlogObject = () => {
        const updatedblogObjects = [...blogEntryObjects, {
            content: "",
            positionInBlogEntry: count,
            type: "paragraph"
        }];
        setCount(count + 1);
        setBlogEntryObjects(updatedblogObjects);
    }

    return (
        <div>
            <h1 className={"float-start mb-5 mt-0"}>Create new post</h1>
            <form className={"w-50 m-5"}>
                <div className="form-group float-label-control">
                    <input type="text" className="form-control" placeholder="Title" defaultValue={title}
                           onChange={e => setTitle(e.target.value)}/>
                </div>
                <ul className="list-group">
                    {blogEntryObjects.map((object) =>
                        <EditBlogEntryObject key={object.positionInBlogEntry} onDelete={onDelete}
                                             updateBlogObject={updateBlogObject} blogEntryObject={object}/>
                    )}
                </ul>
                <div className={"my-1"}>
                <button type="button" className="btn btn-primary w-100 my-1" onClick={addNewBlogObject}>Add new blog object
                </button>
                <button type={"button"} className={"btn btn-success w-100 my-1"}
                        onClick={addBlogEntry}>Publish blog entry
                </button>
                </div>
            </form>
        </div>
    )
}

export default EditBlogEntry;