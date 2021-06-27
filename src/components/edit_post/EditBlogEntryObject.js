import React, {useState} from "react";

const EditBlogEntryObject = ({onDelete, updateBlogObject, blogEntryObject}) => {

    const [isParagraph, setIsParagraph] = useState(blogEntryObject.type === "paragraph");
    const [content, setContent] = useState(blogEntryObject.content);
    const [type, setType] = useState(blogEntryObject.type);

    const photoPreview = React.createRef();

    const contentChanged = (event) => {
        setContent(event.target.value);

        updateBlogObject({
            content: event.target.value,
            positionInBlogEntry: blogEntryObject.positionInBlogEntry,
            type: type
        })
    }

    const typeChanged = (event) => {
        setType(event.target.value);
        setIsParagraph(!isParagraph);

        updateBlogObject({
            content: content,
            positionInBlogEntry: blogEntryObject.positionInBlogEntry,
            type: event.target.value
        })
    }


    return (
        <div className={"bg-light border border-light p-3 rounded-3 my-3"}>
            <div>

                {
                    isParagraph &&
                    <div className="form-group text-left">
                        <label> Paragraph:
                            <textarea className="form-control mb-2 mr-sm-2"
                                      onChange={contentChanged} defaultValue={content} minLength="3" rows={3} cols={100} placeholder={"Enter text..."}/>
                        </label>
                    </div>
                }
                {
                    !isParagraph &&
                    <div>
                        <img ref={photoPreview} id="photoPreview" src="#" alt=""/>
                        <label> Photo link:
                            <input type="url" className="form-control mb-2 mr-sm-2"
                                   onChange={contentChanged} defaultValue={content} minLength="3" size={100} placeholder={"Link to photo"}/>
                        </label>
                    </div>
                }
                <div className="form-check m-3">
                    <input onChange={e => {
                        typeChanged(e);
                    }} className="form-check-input" type="radio"
                           checked={isParagraph === true} value="paragraph"></input>
                    <label className="form-check-label float-start" htmlFor="flexRadioDefault2">Paragraph</label>
                </div>
                <div className="form-check  m-3">
                    <input className="form-check-input" type="radio"
                           onChange={e => {
                               typeChanged(e);
                           }} checked={isParagraph === false}
                           value="photo"></input>
                    <label className="form-check-label float-start" htmlFor="flexRadioDefault1">Photo</label>
                </div>
                <button type="button" className="form-control btn btn-danger"
                        onClick={() => onDelete(blogEntryObject.positionInBlogEntry)}>Delete
                </button>
            </div>

        </div>
    );
}

export default EditBlogEntryObject