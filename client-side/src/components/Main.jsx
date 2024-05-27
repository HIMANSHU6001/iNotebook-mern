import React, { useContext, useState, useEffect } from 'react'
import {FilterMob, LikedHeartNav, HeartNav, PlusNav, PlusRed, HouseNav, HouseRed, Home, Info, User, Trash, LogOut, Heart, LikedHeart, Hamburger, Cross, WhiteAdd, Add, Search, Edit, Filter, DownArrow, Tick } from '../assets/icons/icons';
import UserContext from '../context/notes/userContext';
import noteContext from '../context/notes/noteContext';
import Bullet from './Bullet';
import AddModal from './AddModal';
import DeleteModal from './DeleteModal';
import EditModal from './EditNoteModal';
import ViewModal from './ViewModal';
import Fuse from 'fuse.js'
import { Link } from 'react-router-dom';


export default function Main(props) {
  const userContext = useContext(UserContext);
  const contextNote = useContext(noteContext);
  const { setFilters, filters, displayNotes, setDisplayNotes, notes, setNotes, addNote, deleteNote, editNote, fetchAllNotes, likeNote } = contextNote
  const { user, currentTags, createTag, fetchTags, login, signup, logout } = userContext;
  const { active, setActive, isAddModalOpen, setIsAddModalOpen } = props;
  const [dropdown, setDropdown] = useState(false);
  const [doubleDropdown, setDoubleDropdown] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isHamburger, setIsHamburger] = useState(false)
  const [note, setNote] = useState({});
  const [search, setSearch] = useState("")
  const IMAGES = {
    noNotes: new URL('../assets/images/noNotes.jpg', import.meta.url).href
  }

  const fuseOptions = {
    isCaseSensitive: false,
    shouldSort: true,
    findAllMatches: false,
    minMatchCharLength: 3,
    keys: [
      "title"
    ]
  };

  const fuse = new Fuse(notes, fuseOptions);

  const handleSearch = (search) => {
    let searchResult = fuse.search(search);
    let newNotes = []
    for (let index = 0; index < searchResult.length; index++) {
      const note = searchResult[index].item;
      newNotes.push(note)
    }
    setDisplayNotes(newNotes)
  }

  const getNoteDescription = (note) => {
    console.log(note);
    if (note.length > 100) {
      return note.slice(0, 100) + "..."
    }
    return note
  }

  const getTitle = (title) => {
    if (title.length > 20) {
      return title.slice(0, 20) + "..."
    }
    return title
  }

  const handleClick = (value) => {
    setFilters({ ...filters, tag: value })
    setActive(value)
  }

  const handleLike = (note, like) => {
    let value = !like;
    likeNote(note._id, value);
  }

  const handleDelete = (note) => {
    setNote(note);
    setIsDeleteModalOpen(true)
  }

  const handleView = (note) => {
    setNote(note);
    setIsViewModalOpen(true)
  }

  const handleEdit = (note) => {
    setNote(note)
    setIsEditModalOpen(true)
  }

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

  const getDate = (value) => {
    const date = new Date(value);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
  }

  useEffect(() => {
    console.log("Current Notes are => ", notes);
  }, [notes])


  return (
    <>
      <div className='h-[100vh] overflow-y-scroll'>
        <div className='bg-[#d9d9d9] md:bg-white'>
          <div className='mt-4 justify-between flex lg:hidden'>
            <Link to='/' className='text-primary text-[25px] pl-5 font-semibold '>iNotebook</Link>

            <div onClick={() => setIsHamburger(true)} className="ham mx-5 mt-2 cursor-pointer">{Hamburger}</div>

            {isHamburger &&
              <div className="fixed z-10 border-2 h-[100vh] overflow-auto right-0 top-0 bg-white w-3/4 rounded-l-3xl">
                <button onClick={() => { setIsHamburger(false) }} className='float-right m-5'>{Cross}</button>
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
            }
          </div>
          <div className='grid grid-flow-row grid-cols-3 '>
            <div className=" col-span-3 md:col-span-2">
              <div className="bg-white grid grid-flow-col grid-cols-12 row mt-4 mx-3 border-2 border-primary rounded-lg  ">
                <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} className="col-span-11 pl-1 py-1 mx-2 border-none outline-none focus:border-red-600" placeholder='Search ' />
                <button onClick={() => { handleSearch(search) }} className="col-span-1">
                  <div type='submit' className=' my-auto text-primary ' >
                    {Search}
                  </div>
                </button>
              </div>
            </div>
            <div className="col-span-1 py-2">
              <div className='ml-20 mt-1 absolute'>
                <button onClick={() => { setDropdown(!dropdown) }} className="hidden md:flex text-white bg-red-400 hover:bg-red-600 rounded-md px-5 py-1.5" type="button">Sort <svg className="w-2.5 h-2. mx-3 5 my-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
                </button>
                <div hidden={!dropdown} className="z-10 overflow-visible fixed bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="multiLevelDropdownButton">
                    <li key="newFirst">
                      <button onClick={() => { setFilters({ ...filters, newestFirst: true }) }} className=" w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Newest first {filters.newestFirst && <span className='float-right'>{Tick}</span>}</button>
                    </li>
                    <li key="oldFirst">
                      <button onClick={() => { setFilters({ ...filters, newestFirst: false }) }} className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Oldest first {filters.newestFirst === false && <span className='float-right'>{Tick}</span>}</button>
                    </li>
                    <li key="Fav">
                      <button onClick={() => { setFilters({ ...filters, fav: !(filters.fav) }) }} className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Favourites {filters.fav === true && <span className='float-right'>{Tick}</span>}</button>
                    </li>
                    <li key="tags">
                      <button onClick={() => { setDoubleDropdown(!doubleDropdown) }} className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Tags<svg className="w-2.5 h-2.5 ms-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                      </svg>
                      </button>
                      <div hidden={!doubleDropdown} className="z-20 absolute left-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="doubleDropdownButton">
                          {Object.keys(currentTags).map((key) => {
                            return <li key={key}>
                              <button onClick={() => { handleClick(key) }} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{key} {filters.tag === key && <span className='float-right'>{Tick}</span>}</button>
                            </li>
                          })}
                        </ul>
                      </div>
                    </li>
                    <li>
                      <button onClick={() => { setActive("All"); setFilters({ fav: false, tag: "All", newestFirst: null }) }} className=" w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove all filters</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`mt-6 mx-4 grid grid-flow-col grid-col-${Object.keys(currentTags).length + 1} hidden md:grid`}>
          <button onClick={() => { handleClick("All") }} name="All" className={`${active === 'All' ? 'bg-primary' : ''} ${active === 'All' ? 'text-white' : 'text-black'}  py-[5px] rounded-md text-sm border-2 border-white hover:border-red-400`}>
            All
          </button>
          {Object.keys(currentTags).map((key) => {
            return <button onClick={(e) => { handleClick(e.target.name) }} name={`${key}`} className={`${active === key ? 'bg-primary' : ''} ${active === key ? 'text-white' : 'text-black'} py-[5px] rounded-md text-sm border-2 border-white hover:border-red-400`}>
              {key}
            </button>
          })}
        </div>

        <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 mx-3 mt-7 mb-24">
          {displayNotes.length === 0 ? <div className='col-span-4 '>
            <h1 className='text-2xl text-center font-semibold text-primary'>No Notes Found</h1>
            <img className='h-3/5 m-auto' src={IMAGES.noNotes} alt="No notes to display" />
          </div> : displayNotes.map(note => {
            return <div className="border-2 h-48 m-1 rounded-md grid grid-flow-row grid-cols-1 pt-3 hover:border-primary_light">
              <div>
                <p className='text-xs text-[#8A8A8A] mx-5 my-2 '>{getDate(note.date)}
                  <div className='float-right'>
                    <button onClick={() => { handleLike(note, note.fav) }}>{note.fav ? LikedHeart : Heart}</button>
                    <button onClick={() => { handleEdit(note) }}>{Edit}</button>
                    <button onClick={() => { handleDelete(note) }}>{Trash}</button>
                  </div>
                </p>
              </div>
              <div onClick={() => { handleView(note) }} className='cursor-pointer'>
                <h3 className=' my-3 mx-5'>
                  <Bullet color={currentTags[note.tag]} /> <span className='mx-2'>{getTitle(note.title)}</span>
                </h3>
                <p className=' text-xs h-20 overflow-hidden text-wrap whitespace-pre-wrap text-[#8A8A8A] mx-5  my-2'>
                  {`${getNoteDescription(note.description)}`}
                </p>
              </div>
            </div>
          })
          }
        </div>
        <button onClick={() => { setIsAddModalOpen(true) }} className='hidden md:block fixed bottom-10 right-10 font-semibold text-white bg-primary rounded-full px-3 py-2'> {WhiteAdd} Add note</button>
      </div>

          
      {/* <button onClick={() => {setDropdown(!dropdown)}} className='block md:hidden fixed bottom-20 right-5 font-semibold text-white bg-primary rounded-full px-2 py-1 text-sm'> {FilterMob} Filters</button> */}

      <div className='fixed z-0 grid grid-cols-3 md:hidden bottom-0 h-16 w-full bg-primary_light  rounded-t-3xl'>

        <button className='text-center' onClick={() => { setActive("All"); setFilters({ fav: false, tag: "All", newestFirst: null }) }} >
          <span className='flex w-fit mx-auto h-6'>{isAddModalOpen || filters.fav ? HouseNav : HouseRed}
          </span>
          <span className={`block font-semibold text-${isAddModalOpen || filters.fav ? "white" : "primary"} text-sm`}>
            Home
          </span>
        </button>

        <button className=' justify-center' onClick={() => { setIsAddModalOpen(true) }} >
          <span className='flex w-fit mx-auto h-6'>{isAddModalOpen ? PlusRed : PlusNav}
          </span>
          <span className={`block font-semibold text-${isAddModalOpen ? 'primary' : 'white'} text-sm`}>
            Add Note
          </span>
        </button>


        <button className='' onClick={() => { setFilters({ ...filters, fav: true }) }} >
          <span className='flex w-fit mx-auto h-6'>{filters.fav ? LikedHeartNav : HeartNav}
          </span>
          <span className={`block font-semibold text-${filters.fav ? "primary" : "white"} text-sm`}>
            Favourites
          </span>
        </button>

      </div>
      
      {isEditModalOpen && <EditModal note={note} setIsEditModalOpen={setIsEditModalOpen} isEditModalOpen={isEditModalOpen} />}
      {isDeleteModalOpen && <DeleteModal noteId={note._id} deleteNote={deleteNote} setIsDeleteModalOpen={setIsDeleteModalOpen} isDeleteModalOpen={isDeleteModalOpen} />}
      {isViewModalOpen && <ViewModal note={note} setIsViewModalOpen={setIsViewModalOpen} isViewModalOpen={isViewModalOpen} />}
      {/* {isAddModalOpen && <AddModal setIsAddModalOpen={setIsAddModalOpen} isAddModalOpen={isAddModalOpen} />} */}
    </>
  )
}
