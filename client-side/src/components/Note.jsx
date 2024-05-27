import React from 'react'

function Note() {
    return (
        <div className="border-2 m-1 rounded-md grid grid-flow-row grid-cols-1 pt-3">
            <div>
                <div className='text-xs text-[#8A8A8A] mx-5 my-2 '>12 June 2024
                    <div className='float-right'>
                        {Heart}
                        {Edit}
                        {Trash}
                    </div></div>
            </div>
            <h3 className='my-3 mx-5'>
                {BusinessBullet} <span className='ml-2'>Meeting with a client</span>
            </h3>
            <p className='text-xs text-[#8A8A8A] mx-5  my-2'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...
            </p>
        </div>
    )
}

export default Note