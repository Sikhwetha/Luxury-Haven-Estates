import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signinStart, signinSuccess, signinFailure } from "../redux/app/user/useSlice";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signinStart());

    try {
      const res = await fetch("api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        // Handle server error
        throw new Error(`Server error: ${res.status} - ${res.statusText}`);
      }

      // Clear the error state if there was a previous error
      dispatch(signinSuccess());

      const data = await res.json();
      console.log("Response data:", data);

      // Clear the form data after successful sign-in
      setFormData({});

      navigate('/');
    } catch (error) {
      console.error("Error during fetch:", error);

      // Dispatch signinFailure only on API call error
      dispatch(signinFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg "
          id="email"
          onChange={handleChange}
          value={formData.email || ''}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg "
          id="password"
          onChange={handleChange}
          value={formData.password || ''}
        />
        <button disabled={loading} className="bg-slate-700 text-white p-3 uppercase hover:opacity-70 disabled:opacity-80">
          {loading ? 'loading...' : 'Sign In'}
        </button>
      </form>
      <div className="flex gap-3 mt-5">
        <p>Dont have an account?</p>
        <Link to={"/Signup"}>
          <span className="text-blue-700"> Sign Up </span>
        </Link>
      </div>
      {error && <p className="text-red-500"> {error} </p>}
    </div>
  );
};

export default Signup;
