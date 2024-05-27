import React, { useContext } from 'react'
import UserContext from '../context/notes/userContext';

function ViewModal(props) {

    const userContext = useContext(UserContext);
    const { currentTags } = userContext;
    return (
        <div tabIndex="-1" aria-hidden="true" hidden={!(props.isViewModalOpen)} className=" w-full fixed left-0 z-50 top-5 overflow-auto" >
            <div className="relative mx-auto w-full max-w-4xl" >
                <div className="relative bg-white rounded-lg shadow border-2 border-gray-300">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                        <h3 className="text-lg font-semibold text-primary">
                            {props.note.title}
                        </h3> <br /> <div className='ml-5 rounded-md' style={{ 'backgroundColor': `${currentTags[props.note.tag]}` }} ><p style={{ 'color': `${currentTags[props.note.tag]}`, 'mixBlendMode': 'difference' }} className='text-xs px-1.5 '>{props.note.tag}</p></div>
                        <button onClick={() => { props.setIsViewModalOpen(false); }} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="crud-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span onClick={() => { props.setIsViewModalOpen(false); }} className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className='overflow-auto min-h-80 max-h-[80vh]'>
                            <p className='whitespace-pre-wrap flex items-center justify-between p-5'>
                                {props.note.description}
                            </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewModal