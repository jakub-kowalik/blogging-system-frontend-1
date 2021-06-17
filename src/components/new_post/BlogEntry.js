import {useState} from "react";
import BlogEntryObject from "./BlogEntryObject";
import axios from "axios";

const BlogEntry = () => {
    const [title, setTitle] = useState("");
    const [blogEntryObjects, setBlogEntryObjects] = useState([{
        content: "",
        positionInBlogEntry: Number,
        type: ""
    }
    ]);

    const config = {
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    };

    const onUpdate = () => {

    }

    const addBlogEntry = async (newBlogEntry) => {
        console.log(newBlogEntry)
        await axios.post('http://localhost:8081/api/blog/redactor/createBlogEntry', newBlogEntry,
            config
            ).then((response) => {
                if (response.status === 201) {
                } else {
                    alert('Error creating')
                }
            })
    }

    const prepareData = () => {
        return {
            title: title,
            blogObjects: blogEntryObjects
        };
    }

    return (
        <div>

            <form role="form">
                <div className="form-group float-label-control">
                    <input type="text" className="form-control" placeholder="Title"
                           onChange={e => setTitle(e.target.value)} />
                </div>
                <button type={"button"} className={"btn btn-success m-1"}
                        onClick={() => addBlogEntry(prepareData())
                        }>Add post< /button>
            </form>

            <ul className="list-group">
                {blogEntryObjects.map((blogEntryObject) =>
                    <BlogEntryObject/>
                )}
            </ul>
        </div>
    )
}

export default BlogEntry