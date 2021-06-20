const Comment = ({comment}) => {

    return (
        <div className={"text-start px-5 pt-3 pb-3 m-3 bg-danger rounded-3"} style={{backgroundColor: "gray"}}>
            <div className="mb-4">
                <div className="text-muted fst-italic mb-2">
                    Commented on <span>{comment.createdDate}</span> by {comment.username}
                </div>
                <hr/>
            </div>
            <div>
                <p style={{textIndent: "4em"}}>
                    {comment.content}
                </p>
            </div>
        </div>
    )
}

export default Comment