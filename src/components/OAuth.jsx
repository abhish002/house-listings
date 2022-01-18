import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

import { toast } from 'react-toastify';

import googleIcon from '../assets/svg/googleIcon.svg';

const OAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    signinWithGoogle,
    getUserFromDB,
    saveUserDetailsToDB,
  } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      const user = await signinWithGoogle();
      const userSnap = await getUserFromDB(user.uid);

      if (!userSnap.exists()) {
        saveUserDetailsToDB(user.uid, user.displayName, user.email);
      }
      toast.success('Google Signin successful.');
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('There was an error signing in with Google. Please try again.');
    }
  }

  return (
    <div className='socialLogin'>
      <p>Sign {location.pathname === '/signup' ? 'up' : 'in'} with</p>
      <button className='socialIconDiv' onClick={handleGoogleSignIn}>
        <img className='socialIconImg' src={googleIcon} alt='google icon' />
      </button>
    </div>
  )
}

export default OAuth;
