import React, { useEffect, useState } from 'react'
import NoteForm from '../noteForm/NoteForm'
import FilterButtons from '../filterButtons/FilterButtons'
import NotesTable from '../notesTable/NotesTable'
import Note from '../note/Note';
import axios from 'axios';


function Main() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<"all" | "active" | "archived">("all");
    const [formVisibility, setFormVisibility] = useState(false);
    const SERVER = "https://ensolvers-back.onrender.com/api/notes"
    const [formData, setFormData] = useState<FormData>( {
      id:null,
      name: "",
      text: ""
    })

    interface FormData {
      id:number|null,
      name:string,
      text:string
    }
    useEffect(() => {
        setLoading(true);
        axios.get(SERVER)
        .then((res) => {
            setNotes(res.data);
            setFilteredNotes(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally( () => (setLoading(false)));
    }, [])


    const applyFilter = (filterType: "all" | "active" | "archived", updatedNotes: Note[]) => {
        setFilter(filterType);
        if (filterType === "all") {
          setFilteredNotes(updatedNotes);
        } else if (filterType === "archived") {
          setFilteredNotes(updatedNotes.filter((note) => note.archived));
        } else if(filterType=== "active") {
          setFilteredNotes(updatedNotes.filter((note) => !note.archived));
        }
      };

      const handleDelete = ((id: number)  => {
        axios.delete(SERVER +"/"+ id);

        const updatedNotes = notes.filter ((note) => note.id !== id);
        setNotes(updatedNotes);
        applyFilter(filter, updatedNotes);
    })

    const handleEdit = ((id:number)=> {
      axios.get(SERVER + "/" + id)
      .then((response) => {
        const note:Note = response.data;
        setFormData({
          id:id,
          name: note.name,
          text: note.text

        })
        setFormVisibility(true);
      })
    })
    const submitHandler = ((event: React.FormEvent) => {
      event.preventDefault();
      axios.put<Note>(SERVER,
        {
          id:formData.id,
          name:formData.name,
          text:formData.text
        }
      ).then((note) => {
        const createdNote:Note = note.data;
        const newNote = notes.find((toFind) => toFind.id === createdNote.id)
        let updatedNotes;
        if(newNote){
          updatedNotes = notes.map((note) => (note.id === newNote.id? createdNote: note));
        }else {
          updatedNotes = [...notes,createdNote];
        }
        setNotes(updatedNotes);
        applyFilter(filter,updatedNotes);
      })
    })
    const formHandler = (event: React.ChangeEvent<HTMLIFrameElement & HTMLTextAreaElement>) => {
      const {name, value} = event.target;
      setFormData({
        ...formData,
        [name]: value,
      })
    }
      const handleArchive = ((id: number, isArchived: boolean) => {
        if(isArchived){
            axios.post(SERVER + "/activate/" + id);

        } else {
            axios.post(SERVER + "/archive/" + id);

        }
        const updatedNotes = notes.map((note) => {
            if(note.id === id){
                note.archived = !isArchived;
                return note;
            } else {
                return note;
            } 
        })
        setNotes(updatedNotes);
        applyFilter(filter, updatedNotes);

    })
    const createHandler = (() => {
      setFormVisibility(true)
      setFormData({
        id:null,
        name: "",
        text: ""
      })
    })
  return (
    <>
    <NoteForm
    createHandler={createHandler}
    formVisibility = {formVisibility}
    submitHandler={submitHandler}
    formHandler={formHandler}
    formData={formData}
    
    />
    <h1 className='text-white text-center'>Notes</h1>
    <FilterButtons
    onFilterAll={() => applyFilter("all", notes)}
    onFilterActive={() => applyFilter("active", notes)}
    onFilterArchived={() => applyFilter("archived", notes)}
    activeFilter={filter}
    />
    <NotesTable
    handleDelete={(id) => handleDelete(id)}
    handleArchive={(id, archived) => handleArchive(id, archived)}
    handleEdit={(id) => handleEdit(id)}
    filteredNotes={filteredNotes}

    />
    </>
  )
}

export default Main