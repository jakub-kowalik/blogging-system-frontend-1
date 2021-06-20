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
        <div>
            <div>
                <div className="form-check">
                    <input onChange={e => {
                        typeChanged(e);
                    }} className="form-check-input" type="radio"
                           checked={isParagraph === true} value="paragraph"></input>
                    <label className="form-check-label" htmlFor="flexRadioDefault2">Paragraph</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio"
                           onChange={e => {
                               typeChanged(e);
                           }} checked={isParagraph === false}
                           value="photo"></input>
                    <label className="form-check-label" htmlFor="flexRadioDefault1">Photo</label>
                </div>
                {
                    isParagraph &&
                    <div className="form-group text-left">
                        <label> Paragraph:
                            <textarea className="form-control mb-2 mr-sm-2"
                                      onChange={contentChanged} defaultValue={content} minLength="3"/>
                        </label>
                    </div>
                }
                {
                    !isParagraph &&
                    <div>
                        <img ref={photoPreview} id="photoPreview" src="#" alt=""/>
                        <label> Photo link:
                            <input type="text" className="form-control mb-2 mr-sm-2"
                                   onChange={contentChanged} defaultValue={content} minLength="3"/>
                        </label>
                    </div>
                }
                <button type="button" className="btn btn-secondary"
                        onClick={() => onDelete(blogEntryObject.positionInBlogEntry)}>Delete
                </button>
            </div>

        </div>
    );
}

export default EditBlogEntryObject