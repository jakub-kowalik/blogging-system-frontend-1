import {useState} from "react";
import {getCurrentUserName} from "../../utility/Authorization";

const AddComment = ({parentId, addComment, toggleButton}) => {
    const [contentInput, setContentInput] = useState("");

    return (
        <div>
            <form className={"mx-3 px-5 py-3 bg-light rounded-3"}>

                <div className="form-group float-label-control my-3">
                    <textarea type="text" className="form-control" placeholder="Comment"
                           onChange={e => setContentInput(e.target.value)}/>
                </div>
                <button type={"button"} className={"form-control btn btn-primary my-3"} onClick={() => {
                    addComment(parentId, {username: getCurrentUserName(), content: contentInput});
                    toggleButton();
                }}>Add
                </button>
            </form>
        </div>
    )
}
export default AddComment