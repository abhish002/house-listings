import React, { useState } from 'react';
import { toast } from 'react-toastify';
import OAuth from '../components/OAuth';

import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

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

  const { signin } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const user = await signin(email, password);
      if (user) {
        toast.success('Signin successful');
        navigate('/');
      }
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
          <Link to='/forgot-password' className='forgotPasswordLink'>forgot password?</Link>
          <div className="signInBar">
            <p className="signInText">Sign In</p>
            <button className="signInButton">
              <ArrowRightIcon fill='#ffff' width='34px' height='34px' />
            </button>
          </div>
        </form>
        <OAuth />
        <Link to='/signup' className='registerLink'>New User? Sign Up</Link>
      </div>
    </>
  )
}

export default Signin
