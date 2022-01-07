import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';

import { Link, useNavigate } from 'react-router-dom';

import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = formData;

  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setFormData({
      ...formData,
      name: e.target.value,
    });
  }

  const handleEmailChange = (e) => {
    setFormData({
      ...formData,
      email: e.target.value,
    });
  }

  const handlePasswordChange = (e) => {
    setFormData({
      ...formData,
      password: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const userData = {
        name,
        email,
        timestamp: serverTimestamp(),
      };

      await setDoc(doc(db, 'users', user.uid), userData);

      navigate('/');
    } catch (error) {
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
            onChange={handleNameChange}
            placeholder='Name' />

          <input
            className='emailInput'
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder='Email' />

          <div className="passwordFieldContainer">
            <input
              className='passwordInput'
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
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
