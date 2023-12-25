import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

// Replace with your actual Redux action types and creators
// const UPDATE_AVATAR = 'UPDATE_AVATAR';
// const updateAvatar = (avatarURL) => ({ type: UPDATE_AVATAR, payload: avatarURL });

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [fileperc, setFileperc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

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
            // Update Redux state with the new avatar URL
            // dispatch(updateAvatar(downloadURL));

            // Update local state for formData
            setFormData({ ...formData, avatar: downloadURL });
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
            setFileUploadError(true);
          });
      }
    );
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold text-center">Profile</h1>
      <form className='flex flex-col gap-2'>
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
          id="username"
          className='border p-3 rounded-md'
        />

        <input
          type="email"
          placeholder='email'
          id="email"
          className='border p-3 rounded-md'
        />

        <input
          type="password"
          placeholder='password'
          id="password"
          className='border p-3 rounded-md'
        />

        <button
          className='bg-slate-700 text-white p-3 uppercase hover:opacity-75 disabled:opacity-80'>
          Update
        </button>

      </form>
      <div className="flex justify-between mt-5">
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
