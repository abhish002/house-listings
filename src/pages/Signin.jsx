import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { Link, useNavigate } from 'react-router-dom';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';

function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const auth = getAuth();
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      user && navigate('/');
    } catch (error) {
      toast.error('Invalid email or password. Please try again.');
    }
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Signin</p>
        </header>
        <form onSubmit={handleSubmit}>
          <input
            className='emailInput'
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={handleChange}
            placeholder='Email'
            autoComplete='off' />
          <div className="passwordFieldContainer">
            <input
              className='passwordInput'
              type={showPassword ? 'text' : 'password'}
              name="password" id="password" value={password}
              onChange={handleChange}
              placeholder='Password'
              maxLength={12} autoComplete='off' />
            <img
              src={visibilityIcon}
              alt="visibility icon"
              className="showPassword"
              onClick={() => setShowPassword((prevState) => !prevState)} />
          </div>
          <Link to='/forgot-passwword' className='forgotPasswordLink'>forgot password?</Link>
          <div className="signInBar">
            <p className="signInText">Sign In</p>
            <button className="signInButton">
              <ArrowRightIcon fill='#ffff' width='34px' height='34px' />
            </button>
          </div>
        </form>
        {/* Google O-Auth componenent */}
        <Link to='/signup' className='registerLink'>New User? Sign Up</Link>
      </div>
    </>
  )
}

export default Signin
