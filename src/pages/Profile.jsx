import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import {updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserSuccess, SignOutUserFailure, SignOutUserStart} from"../redux/app/user/useSlice"
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'

// Replace with your actual Redux action types and creators
// const UPDATE_AVATAR = 'UPDATE_AVATAR';
// const updateAvatar = (avatarURL) => ({ type: UPDATE_AVATAR, payload: avatarURL });

// allow read;
// allow write: if request.resource.size < 2 * 1024 * 1024 &&
//                 request.resource.contentType.matches('images/.*');

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser,loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [fileperc, setFileperc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [isUpdateSuccess, setUpdateSuccess] = useState(false);



  const dispatch = useDispatch()


  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileperc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
     
            setFormData({ ...formData, avatar: downloadURL });
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
            setFileUploadError(true);
          });
      }
    );
  };
  
  const handlechange = (e) =>{
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(formData), 
      });
       const data = await res.json()
       if (data.success === false){
        dispatch(updateUserFailure(data.message))
       }

       dispatch(updateUserSuccess(data));

       setUpdateSuccess(true)
    
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  
  const handleDeleteUser = async () =>{
    try{
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE',
      });
      const data = await res.json();
      if(data.message){
        dispatch(deleteUserFailure(data.message))
        return;
      };
      dispatch(deleteUserSuccess(data));
    }catch(error){
      dispatch(deleteUserFailure(error.message))
    }

  }

  let access_token = ''; // Initialize with an appropriate value or an empty string

  const handleSignOut = async () => {
    try {
      dispatch(SignOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
  
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
  
      // Assuming the access_token is part of the response data
      access_token = data.access_token;
  
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      console.error('Error signing out:', error);
      dispatch(deleteUserFailure(error.message));
    }
  };
  
  

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold text-center">Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept='image/*'
        />

        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>Error Image upload (image must be less than 2mb)</span>
          ) : fileperc > 0 && fileperc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${fileperc}%`}</span>
          ) : fileperc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded</span>
          ) : (
            ""
          )}
        </p>

        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />

        <input
          type="text"
          placeholder='username'
          defaultValue={currentUser.username}
          id="username"
          className='border p-3 rounded-md'
          onChange={handlechange}
        />

        <input
          type="email"
          placeholder='email'
          defaultValue={currentUser.email}
          id="email"
          className='border p-3 rounded-md'
          onChange={handlechange}
        />

        <input
          type="password"
          placeholder='password'
          id="password"
          className='border p-3 rounded-md'
          onChange={handlechange}
        />

        <button disabled={loading}
          className='bg-slate-700 text-white p-3 uppercase hover:opacity-75 disabled:opacity-80'>
          {loading ? 'Loadingg...' : 'Update'}
        </button>
        <Link className='bg-green-600 text-white p-2 uppercase text-center hover:opacity-95' to={"/create-listing"}>
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
      <p className='text-red-700 mt-3'>{error ? error : ''}</p>
      <p className='text-green-700 mt-3'>{isUpdateSuccess ? 'User is updated successfully!' : ''}</p>

    </div>
  );
};

export default Profile;
