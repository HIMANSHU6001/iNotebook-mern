import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AddModal from './AddModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { Home, Info, User, Trash, LogOut, LikedHeart, Heart, Add, Search, Edit, Filter, DownArrow } from '../assets/icons/icons';
import AddTagModal from './AddTagModal';
import UserContext from '../context/notes/userContext';
import Bullet from './Bullet';
import noteContext from '../context/notes/noteContext';


export default function Sidebar(props) {

  const contextNote = useContext(noteContext);
  const { filters, setFilters, displayNotes, setDisplayNotes, notes, setNotes, addNote, deleteNote, editNote, fetchAllNotes, likeNote } = contextNote
  const userContext = useContext(UserContext);
  const { active, setActive, isAddModalOpen, setIsAddModalOpen } = props;
  const { user, getUserData, currentTags, createTag, fetchTags, login, signup, logout } = userContext;
  const [isAddTagOpen, setIsAddTagOpen] = useState(false);

  const handleLogOut = () => {
    logout()
  }

  const handlefavourites = () => {
    setFilters({ ...filters, fav: !(filters.fav) })
  }

  const handleTagClick = (value) => {
    setFilters({ ...filters, tag: value })
    setActive(value)
  }

  useEffect(() => {
    fetchTags()
    getUserData()
  }, [])

  return (
    <>
      <div className=' grid-flow-row grid-cols-1 bg-gray_bg h-[100vh] overflow-y-auto pb-28'>
        <div className='mt-4'>
          <Link to='/' className='text-primary text-[25px] pl-5 font-semibold'>iNotebook</Link>
        </div>

        <div className="row pl-5 mt-[30px] " >
          <div className='w-14 h-14 border-2 bg-cover rounded-full' style={{ "backgroundImage": `url(${user.image})` }}></div>
          <p className=' text-[15px] mt-2'>{user.name}</p>
        </div>

        <div className='mt-[40px] text-[18px] pl-5'>
          NOTES
        </div>

        {Object.keys(currentTags).length === 0 && "No Tags to display"}
        {Object.keys(currentTags).map((key) => {
          return <button onClick={() => { handleTagClick(key) }} className='row w-full text-left block py-2 pl-5 hover:bg-primary_light hover:border-r-4 hover:border-primary'>
            <Bullet color={currentTags[key]} />
            <p className='inline-block align-middle text-[13px] ml-5'> {key}</p>
          </button>
        })}

        {Object.keys(currentTags).length > 6 ? null : <button onClick={() => { setIsAddTagOpen(true) }} className='row w-full text-left block py-2 pl-5 hover:bg-primary_light hover:border-r-4 hover:border-primary mb-10'>
          {Add}
          <p className='inline-block align-middle text-[13px]'>Add new tags</p>
        </button>}

        <div className='mt-[25px] text-[18px] pl-5'>
          QUICK LINKS
        </div>

        <button onClick={() => { setIsAddModalOpen(true) }} className='row mt-[20px] w-full text-left block py-2 pl-5 hover:bg-primary_light hover:border-r-4 hover:border-primary' type="button">
          {Add}
          <p className='inline-block align-middle text-[13px] '>Add new notes</p>
        </button>

        <button onClick={() => handlefavourites()} className='row  w-full text-left block py-2 pl-5 hover:bg-primary_light hover:border-r-4 hover:border-primary'>
          {filters.fav ? LikedHeart : Heart}
          <p className='inline-block align-middle text-[13px]'>Favourites</p>
        </button>

        <button onClick={() => { setActive("All"); setFilters({ fav: false, tag: "All", newestFirst: null }) }} className='row  w-full text-left block py-2 pl-5 hover:bg-primary_light hover:border-r-4 hover:border-primary'>
          {Home}
          <p className='inline-block align-middle text-[13px]'>Home</p>
        </button>
        <button onClick={() => { handleLogOut() }} className='row  w-full text-left block py-2 pl-5 hover:bg-primary_light hover:border-r-4 hover:border-primary'>
          {LogOut}
          <p className='inline-block align-middle text-[13px]'>Logout</p>
        </button>
      </div>
      
      {isAddModalOpen && <AddModal setIsAddModalOpen={setIsAddModalOpen} isAddModalOpen={isAddModalOpen} />}
      {isAddTagOpen && <AddTagModal setIsAddTagOpen={setIsAddTagOpen} isAddTagOpen={isAddTagOpen} />}
    </>
  )
}
