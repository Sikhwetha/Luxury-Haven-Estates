import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const {currentUser} = useSelector((state) => state.user)

  return (
    <div className='p-3 max-w-lg mx-auto'>
     <h1 className=" text-3xl font-semibold text-center">Profile </h1>
     <form className='flex flex-col gap-2' >
      <img src={currentUser.Avatar} alt='profile' className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>
      <input type="text" placeholder='username' id="username" className='border p-3 rounded-md'/>
      <input type="email" placeholder='email' id="email" className='border p-3 rounded-md'/>
      <input type="password" placeholder='password' id="password" className='border p-3 rounded-md'/>
      <button className='bg-slate-700 text-white p-3 uppercase hover:opacity-75 disabled:opacity-80'>Update</button>
     </form>
     <div className="flex justify-between mt-5">
      <span className='text-red-700 cursor-pointer'>Delete Account</span>
      <span className='text-red-700 cursor-pointer'>Sign out</span>
     </div>
    </div>
  )
}

export default Profile
