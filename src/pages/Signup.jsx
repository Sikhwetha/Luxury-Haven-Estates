// import React from 'react'



import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

const Signin = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("api/auth/signup", {
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
      setError(null);
    
      const data = await res.json();
      console.log("Response data:", data);
      navigate('/Signin')
    
    } catch (error) {
      console.error("Error during fetch:", error);
     
      setError(error.message);

    }
    setLoading(false);
  }    

  console.log(formData);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg "
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg "
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg "
          id="password"
          onChange={handleChange}
        />
        <button disabled={loading} className="bg-slate-700 text-white p-3 uppercase hover:opacity-70 disabled:opacity-80">
          {loading ?'loading...':'Sign up'}
        </button>
      </form>

      <div className="flex gap-3 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign In"}>
          <span className="text-blue-700"> Sign in </span>
        </Link>
      </div>
    {error && <p className="text-red-500"> {error} </p>}
    </div>
  );
};

export default Signin;
Signin;

