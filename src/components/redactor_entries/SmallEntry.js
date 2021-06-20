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
        history.push('post/'+id);
    }

    return (
        <div>
            <p>{title} , ilosc wyswietlen = {viewCount} , utworzony {createdDate}</p>
            <Button onClick={goToEntryPage}>Go there</Button>
        </div>
    )
}

export default SmallEntry;