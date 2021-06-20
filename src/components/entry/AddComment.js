import {useState} from "react";

const AddComment = ({parentId, addComment, toggleButton}) => {
    const [contentInput, setContentInput] = useState("");
    const [usernameInput, setUsernameInput] = useState("");

    return (
        <div>
            <form>
                <div className="form-group float-label-control">
                    <input type="text" className="form-control" placeholder="Username"
                           onChange={e => setUsernameInput(e.target.value)}/>
                </div>
                <div className="form-group float-label-control">
                    <input type="text" className="form-control" placeholder="Comment"
                           onChange={e => setContentInput(e.target.value)}/>
                </div>
                <button type={"button"} className={"form-control btn"} onClick={() => {
                    addComment(parentId, {username: usernameInput, content: contentInput});
                    toggleButton();
                }}>Add
                </button>
            </form>
        </div>
    )
}
export default AddComment