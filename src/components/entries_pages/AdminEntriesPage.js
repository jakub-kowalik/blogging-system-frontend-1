import {useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {handleError} from "../../utility/Authorization";
import DetailedEntry from "../entries_components/DetailedEntry";

const AdminEntriesPage = () => {
    const history = useHistory();
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        axios.get(
            process.env.REACT_APP_BACKEND_URL + '/api/blog/admin/getAllEntries',
            {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}
        ).then((response) => {
            if (response.status === 200) {
                setEntries(response.data);
                console.log(response.data);
            }
        }).catch(function (error) {
            handleError(error, history);
        });
    },[]);


    return (
        <>
            {entries
                .sort((a,b) => {
                    return new Date(b.createdDate) - new Date(a.createdDate);
                })
                .map((entry) =>
                    <DetailedEntry key={entry.createdDate} entry ={entry}/>
                )}
        </>
    )



}

export default AdminEntriesPage;