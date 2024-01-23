import React from 'react'

const Profile = () => {
  return (
    <div>
      <div className=' flex gap-x-20 my-10 mx-20'>
        <div className=' w-36 h-36 bg-slate-600 rounded-full'>
        </div>
        <div className=' w-1/2 bg-slate-400 p-2'>
          <h1 className=' text-2xl'>Name</h1>
          <h3>Bio</h3>
          <h3>Location</h3>
        </div>
      </div>
      <div className='  w-full my-10 mx-20 flex flex-wrap'>
        <div className=' w-[30rem] h-40 bg-slate-300'>
        </div>
        <div className=' w-[30rem] h-40 bg-slate-300'>
        </div>
        <div className=' w-[30rem] h-40 bg-slate-300'>
        </div>
      </div>
    </div>
  )
}

export default Profile