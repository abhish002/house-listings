import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { Link, useNavigate } from 'react-router-dom';

import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';

import { useAuth } from '../contexts/AuthContext';

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = formData;

  const { signup, updateName, updateDB } = useAuth();

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

      const user = await signup(email, password);
      await updateName(name);
      updateDB(user.uid, name, email);

      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('There was an error creating your account. Please try again.');
    }
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Register</p>
        </header>
        <form onSubmit={handleSubmit}>
          <input
            className='nameInput'
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleChange}
            placeholder='Name' />

          <input
            className='emailInput'
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={handleChange}
            placeholder='Email' />

          <div className="passwordFieldContainer">
            <input
              className='passwordInput'
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              value={password}
              onChange={handleChange}
              placeholder='Password'
              maxLength={12} />
            <img
              src={visibilityIcon}
              alt="visibility icon"
              className="showPassword"
              onClick={() => setShowPassword((prevState) => !prevState)} />
          </div>

          <Link to='/forgot-passwword' className='forgotPasswordLink'>forgot password?</Link>

          <div className="signUpBar">
            <p className="signUpText">Sign Up</p>
            <button className="signUpButton" type='submit'>
              <ArrowRightIcon fill='#ffff' width='34px' height='34px' />
            </button>
          </div>
        </form>
        {/* Google O-Auth componenent */}
        <Link to='/signin' className='registerLink'>Sign In Instead</Link>
      </div>
    </>
  )
}

export default Signup
