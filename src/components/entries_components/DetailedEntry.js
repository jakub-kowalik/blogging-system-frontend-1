import {useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";
import React from "react";


const DetailedEntry = ({entry}) => {
    const history = useHistory();


    const id = entry.id;
    const title = entry.title;
    const viewCount = entry.viewCount;
    const createdDate = entry.createdDate;


    const goToEntryPage = () => {
        history.push('post/'+ entry.id);
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
            <article className={"text-start px-5 pt-3 pb-3 m-3 bg-light rounded-3"}>
                <header className="mb-4">

                    <h3 style={{wordWrap:"break-word"}} className="fw-bolder mb-1">{entry.title}</h3>


                    <div className="text-muted fst-italic mb-2">Posted on <span
                        title={entry.createdDate}>{formatDate(entry.createdDate)}</span>
                    </div>
                    <div className="text-muted fst-italic mb-2">Posted by <span
                        title={entry.author.username}>{entry.author.username}</span>
                    </div>
                    {
                        entry.firstParagraph !== null &&
                        <div className="mb-2"><span
                            title={entry.firstParagraph}>{entry.firstParagraph.toString().slice(0,300) + "..."}</span>
                        </div>
                    }

                </header>

                <hr/>
                <a href={"/post/" + entry.id}><Button onClick={goToEntryPage}>Read more</Button></a>
            </article>

        </>
    )
}

export default DetailedEntry;