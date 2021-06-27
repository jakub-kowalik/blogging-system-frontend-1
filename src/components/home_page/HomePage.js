import React, {useEffect, useState} from 'react';

import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Pagination from '@material-ui/lab/Pagination';
import "./Homepage.css"
import DetailedEntry from "../entries_components/DetailedEntry";

const Homepage = () => {
    const [entries, setEntries] = useState([]);
    const [pageNr, setPageNr] = useState(1);
    const [pageCount, setPageCount] = useState(10);
    const displayedEntries = 5;

    useEffect( () => {
       getPage(pageNr);
    }, []);

    const getPage = (pageNr) => {
        axios.get(
            process.env.REACT_APP_BACKEND_URL + `/api/blog/getFrontPage?page=${pageNr - 1}&size=${displayedEntries}`,
        ).then((response) => {
            if(response.status === 200) {
                setEntries(response.data.content)
                console.log(response.data)
                if(pageNr >= response.data.totalPages && response.data.content.length === displayedEntries ) {
                    setPageCount(pageNr + 1);
                }
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    const changePage = (event, value) => {
        setPageNr(value);
        getPage(value);
    }

    return(
        <div>
            <div>
                {entries.map((entry) =>
                        <DetailedEntry key={entry.createdDate} entry ={entry}/>
                    )}
            </div>
            <div>
            <Typography className={"p-3"}>Page: {pageNr}</Typography>
            <Pagination count={pageCount} page={pageNr} size="large"
                        variant="outlined" shape="rounded"
                        onChange={changePage} color="secondary" />
            </div>
        </div>

    )
}
export default Homepage;