import React, {useState} from "react";
import BlogEntryObject from "./BlogEntryObject";
import update from 'immutability-helper';
import axios from "axios";

const BlogEntry = () => {
    const [title, setTitle] = useState("");
    const [count, setCount] = useState(0);

    const [blogEntryObjects, setBlogEntryObjects] = useState([]);

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

    const addBlogEntry = () => {
        postBlogEntry(prepareData());
    }

    const postBlogEntry = async () => {
        const payload = {
            title: title,
            blogObjects: blogEntryObjects
        }
        console.log(payload)
        await axios.post('http://localhost:8081/api/blog/redactor/createBlogEntry', payload,
            config
            ).then((response) => {
                if (response.status === 201) {

                } else if (response.status === 500) {

                }
            }).catch((error) =>  {
            console.log("Error")
        });
    }



    const prepareData = () => {
        return {
            title: title,
            blogObjects: blogEntryObjects
        };
    }

    const addNewBlogObject = () => {
        const updatedblogObjects = [...blogEntryObjects, {
            content: "",
            positionInBlogEntry: count,
            type: "paragraph"
        } ];
        setCount(count + 1);
        setBlogEntryObjects(updatedblogObjects);
    }

    return (
        <div>
            <Toast></Toast>

            <form >
                <div className="form-group float-label-control">
                    <input type="text" className="form-control" placeholder="Title"
                           onChange={e => setTitle(e.target.value)} />
                </div>
                <ul className="list-group">
                    {blogEntryObjects.map((object) =>
                        <BlogEntryObject key={object.positionInBlogEntry} onDelete={onDelete}
                                         updateBlogObject={updateBlogObject} blogEntryObject={object}/>
                    )}
                </ul>
                <button type="button" className="btn btn-secondary" onClick={addNewBlogObject}>Add new blog object</button>


                <button type={"button"} className={"btn btn-success m-1"}
                        onClick={addBlogEntry}>Publish blog entry</button>
            </form>



        </div>
    )
}

export default BlogEntry;