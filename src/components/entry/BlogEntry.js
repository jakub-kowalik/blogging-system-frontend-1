import BlogObject from "./BlogObject";
import Comment from "./Comment";
import {isUser} from "../../utility/Authorization";
import Socials from "./Socials";
import {useEffect, useState} from "react";
import AddComment from "./AddComment";

const BlogEntry = ({entryId, entryData, comments, addComment, isFrontpage, location}) => {
    //const [comments, setComments] = useState([]);
    const [addCommentBoolean, setAddCommentBoolean] = useState(false)

    const shareUrl = location


    const toggleAddComment = () => {
        console.log(addCommentBoolean)
        setAddCommentBoolean(!addCommentBoolean);
    }

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    function formatDate(dateString) {
        let date = new Date(dateString);
        return (date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear())
    }

    return (
        <>
            <article className={"text-start px-5 pt-3 pb-3 m-3 bg-info rounded-3"}>
                <header className="mb-4">

                    <h1 className="fw-bolder mb-1">{entryData.title}</h1>

                    <div className="text-muted fst-italic mb-2">Posted on <span
                        title={entryData.createdDate}>{formatDate(entryData.createdDate)}</span> by {entryData.author.username}
                    </div>
                </header>
                <hr/>
                <section>
                    {entryData.blogObjects
                        .sort((a, b) => a.positionInBlogEntry > b.positionInBlogEntry ? 1 : -1)
                        .map(blogObject => (
                            <BlogObject key={blogObject.positionInBlogEntry} blogObject={blogObject}/>))}
                </section>
                <hr/>
                <div className={"container w-100"}>
                    <div className={"row"}>
                        <div className={"col my-auto"}>
                            {isUser() &&
                                <button className={"btn btn-dark"} onClick={() => toggleAddComment()}>Comment</button>
                            }
                        </div>
                        <div className={"col my-auto"}>
                            <span className={"float-end"}>
                                <Socials shareUrl={shareUrl} />
                            </span>
                        </div>
                    </div>
                </div>
                <hr/>
            </article>
            {addCommentBoolean &&
            <AddComment parentId={entryId} addComment={addComment} toggleButton={toggleAddComment} />
            }
            {!isFrontpage && comments !== null &&
            comments.map(comment => (<Comment key={comment.id} comment={comment}/>))
            }
        </>
    );
}

export default BlogEntry