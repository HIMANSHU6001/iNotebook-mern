import React, { useContext } from 'react'
import Main from '../components/Main';
import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import UserContext from '../context/notes/userContext';

function Home() {
  const navigate = useNavigate();
  const NoteContext = useContext(noteContext);
  const userContext = useContext(UserContext);
  const [active, setActive] = useState("All")
  const { currentTags, createTag, fetchTags, login, signup } = userContext;
  const { notes, setNotes, addNote, deleteNote, editNote, fetchAllNotes } = NoteContext;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log(localStorage.getItem('token'));
      fetchAllNotes();
      fetchTags()
      // eslint-disable-next-line
    }
    else {
      navigate("/loginsignup")
    }
  }, [])
  return (
    <div className='grid grid-flow-row grid-cols-12 grid-rows-1 h-[100vh]'>
      <div className='col-span-2 h-[100vh] hidden lg:block'>
        <Sidebar setActive={setActive} active={active} isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen}/>
      </div>
      <div className='col-span-12 lg:col-span-10 h-[100vh] border-2'>
        <Main setActive={setActive} active={active} isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen}/>
      </div>
    </div>
  )
}

export default Home