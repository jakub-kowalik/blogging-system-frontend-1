import React, {useEffect, useState} from 'react';

import axios from "axios";
import SmallEntry from "../redactor_entries/SmallEntry";
import Typography from "@material-ui/core/Typography";
import Pagination from '@material-ui/lab/Pagination';

const Homepage = () => {
    const [entries, setEntries] = useState([]);
    const [pageNr, setPageNr] = useState(0);
    const [pageCount, setPageCount] = useState(10);
    const displayedEntries = 5;

    useEffect( () => {
       getPage(pageNr);
    }, []);

    const getPage = (pageNr) => {
        axios.get(
            `http://localhost:8081/api/blog/getFrontPage?page=${pageNr - 1}&size=${displayedEntries}`,
        ).then((response) => {
            if(response.status === 200) {
                setEntries(response.data.content)
                if(pageNr >= pageCount && response.data.content.length === displayedEntries ) {
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
                        <SmallEntry key={entry.createdDate} entry ={entry}/>
                    )}
            </div>
            <Typography>Page: {pageNr}</Typography>
            <Pagination count={pageCount} page={pageNr} size="large"
                        variant="outlined" shape="rounded"
                        onChange={changePage} color="secondary" />
        </div>

    )
}
export default Homepage;