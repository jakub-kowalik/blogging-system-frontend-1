import {useState} from "react";

const AddComment = ({parentId, addComment, toggleButton}) => {
    const [contentInput, setContentInput] = useState("");
    const [usernameInput, setUsernameInput] = useState("");

    return (
        <div>
            <form className={"mx-3 px-5 py-3 bg-light rounded-3"}>
                <div className="form-group float-label-control my-3">
                    <input type="text" className="form-control" placeholder="Username"
                           onChange={e => setUsernameInput(e.target.value)}/>
                </div>
                <div className="form-group float-label-control my-3">
                    <textarea type="text" className="form-control" placeholder="Comment"
                           onChange={e => setContentInput(e.target.value)}/>
                </div>
                <button type={"button"} className={"form-control btn btn-primary my-3"} onClick={() => {
                    addComment(parentId, {username: usernameInput, content: contentInput});
                    toggleButton();
                }}>Add
                </button>
            </form>
        </div>
    )
}
export default AddComment