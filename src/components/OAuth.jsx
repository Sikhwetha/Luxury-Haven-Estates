import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signinSuccess } from '../redux/app/user/useSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
   const navigate = useNavigate();

  const HandelGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: await result.user.photoURL,
        }),
      });

      const data = await res.json(); // Corrected the method name to json()

      dispatch(signinSuccess(data));

      console.log('data is ', data);
      navigate('/');
    } catch (error) {
      console.error('Could not sign in with Google', error);
    }
  };

  return (
    <button
      onClick={HandelGoogleClick}
      type="button"
      className="bg-red-700 text-white text p-2 uppercase hover:opacity-95"
    >
      CONTINUE WITH GOOGLE
    </button>
  );
}
