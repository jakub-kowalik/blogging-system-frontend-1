import React from "react";
import {useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";

const SmallEntry = ({entry}) => {
    const history = useHistory();


    const id = entry.id;
    const title = entry.title;
    const viewCount = entry.viewCount;
    const createdDate = entry.createdDate;

    const goToEntryPage = () => {
        history.push('post/'+ entry.id);
    }

    return (
        <>
            <article className={"text-start px-5 pt-3 pb-3 m-3 bg-light rounded-3"}>
                <header className="mb-4">

                    <h3 style={{wordWrap:"break-word"}} className="fw-bolder mb-1">{entry.title}</h3>


                    <div className="text-muted fst-italic mb-2">Posted on <span
                        title={entry.createdDate}>{entry.createdDate}</span>
                    </div>

                </header>

                <hr/>

                <a href={"http://localhost:3000/post/" + entry.id}><Button onClick={goToEntryPage}>Read more</Button></a>
            </article>

        </>
    )
}

export default SmallEntry;