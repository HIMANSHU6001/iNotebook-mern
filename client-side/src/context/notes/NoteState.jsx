import NoteContext from "./noteContext";
import { useState, useEffect } from 'react'

const NoteState = (props) => {
    
    // const port = process.env.PORT||5000;
    let notesInitial = []
    const [notes, setNotes] = useState(notesInitial);
    const [displayNotes, setDisplayNotes] = useState([])
    const [filters, setFilters] = useState({ fav: false, tag: "All", newestFirst: null })
    const { showAlert } = props; 

    useEffect(() => {
        setDisplayNotes(notes)
    }, [notes])

    useEffect(() => {
        filter()
    }, [filters])

    const filter = () => {
        let newNotes = []
        if (filters.tag === "All") {
            if (!filters.fav) {
                newNotes = notes
            }
            else {
                for (let index = 0; index < notes.length; index++) {
                    const note = notes[index];
                    if (note.fav === true) {
                        newNotes.push(note)
                    }
                }
            }
        }
        else {
            if (!filters.fav) {
                for (let index = 0; index < notes.length; index++) {
                    const note = notes[index];
                    if (note.tag === filters.tag) {
                        newNotes.push(note)
                    }
                }
            }
            else {
                for (let index = 0; index < notes.length; index++) {
                    const note = notes[index];
                    if (note.fav === true && note.tag === filters.tag) {
                        newNotes.push(note)
                    }
                }
            }
        }
        if(filters.newestFirst !== null){
            newNotes.sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            });

            if(filters.newestFirst === false){
                newNotes.reverse()
            }
        } 
        setDisplayNotes(newNotes)
    }

    // Get all Notes
    const fetchAllNotes = async () => {
        const url = `/api/notes/fetchallnotes`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json()
        setNotes(json);
    }

    // Add a note
    const addNote = async (title, description, tag) => {
        const url = `/api/notes/addnote`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note));
        showAlert("Note added successfully", "success");
    }
    // Delete a note
    const deleteNote = async (noteId) => {

        const url = `${host}/api/notes/deletenote/${noteId}`
        fetch(url, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const newNote = notes.filter((note) => { return note._id !== noteId });
        setNotes(newNote);
        showAlert("Note deleted ", "warning");
    }

    // Edit a note
    const editNote = async (id, title, description, tag) => {
        //API call
        const url = `${host}/api/notes/updatenote/${id}`
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();
        console.log(json);
        // Edit in client
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            if (newNotes[index]._id === id) {
                setNotes()
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
        showAlert("Note Saved", "info");
    }

    const likeNote = async (id, like) => {
        //API call
        const url = `${host}/api/notes/updatenote/${id}`
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ like })
        });

        // Edit in client
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            if (newNotes[index]._id === id) {
                setNotes()
                newNotes[index].fav = like;
                break;
            }
        }
        setNotes(newNotes);
    }


    return (
        <NoteContext.Provider value={{ setFilters, filters, displayNotes, setDisplayNotes, notes, likeNote, setNotes, addNote, deleteNote, editNote, fetchAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;