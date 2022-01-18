import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const {sendPasswordResetEmailLink} = useAuth();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit = async (e) => {
    try{
      e.preventDefault();
      await sendPasswordResetEmailLink(email);
      toast.success('Email sent successfully. Please check your email.');
    } catch(error) {
      toast.error('Error sending email. Please try again.');
    }
  }

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Forgot Password</p>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            className='emailInput'
            placeholder='Email'
            value={email}
            onChange={handleEmailChange}
          />

          <Link className='forgotPasswordLink' to='/signin'>
            Sign In
          </Link>

          <div className='signInBar'>
            <div className='signInText'>Send Reset Link</div>
            <button className='signInButton'>
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default ForgotPassword
