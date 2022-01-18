import React, { useState } from 'react';

import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

function Profile() {
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const {
    logOut,
    currentUser,
    updateName,
    updateUserDetails
  } = useAuth();

  const [formData, setFormData] = useState({
    name: currentUser.displayName,
    email: currentUser.email,
  });

  const { name, email } = formData;

  const handleLogout = () => {
    logOut();
    navigate('/');
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async () => {
    try {
      // update displayName in profile
      if (currentUser.displayName !== name) {
        await updateName(name);
        // update firestore user data
        await updateUserDetails({ displayName: name });
        toast.success('Profile updated successfully.');
      }
    } catch (error) {
      toast.error('Cannot update profile. please try again later.');
    }
  }

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">
          My Profile
        </p>
        <button className="logOut" onClick={handleLogout}>Logout</button>
      </header>
      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p aria-live='polite' className="changePersonalDetails" onClick={(e) => {
            isEdit && handleSubmit(e);
            setIsEdit(!isEdit);
          }}>
            {isEdit ? 'Save' : 'Edit'}
          </p>
        </div>
        <div className="profileCard">
          <form>
            <input
              type="text"
              name="name"
              id="name"
              className={!isEdit ? 'profileName' : 'profileNameActive'}
              placeholder='Name'
              value={name}
              onChange={handleChange}
              disabled={!isEdit} />

            <input
              type="text"
              name="email"
              id="email"
              className={'profileEmail'}
              placeholder='Name'
              value={email}
              onChange={handleChange}
              disabled={true} />
          </form>
        </div>
      </main>
    </div>
  )
}

export default Profile;
