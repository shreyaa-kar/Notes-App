import React, {useEffect, useState} from "react";
import axios from 'axios';
import './Home.css';
import NoteCard from "../../components/NoteCard/NoteCard";
import AddIcon from "./add-icon.png"
import { Link } from 'react-router-dom'; 

function Home() {
    const [notes, setNotes] = useState([]);

    const loadNotes = async () =>{
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/notes`);

        setNotes(response.data.data);
    }

    useEffect(()=>{
        loadNotes();
    }, []);
    
    return (
    <div className="body pb-5">
        <h1 className="text-center pt-4">All Notes</h1><hr />
        <div className="container">
        {
            notes.map((note) => {
                const {_id, title, content, category} = note;
                return( <NoteCard key={_id} _id={_id} title={title} content={content} category={category} loadNotes={loadNotes} /> )
            })
        }
        </div>
        <Link to={'/new-note'} >
            <img src={AddIcon} className="position-fixed add-icon shadow-lg border border-dark-subtle p-2 rounded-circle"/>
        </Link>
    </div>
  )
}

export default Home