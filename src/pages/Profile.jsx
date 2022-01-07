import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase.config';

import { useNavigate } from 'react-router-dom';

function Profile() {
  const auth = getAuth();

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

  }, [])

  const handleLogout = () => {
    auth.signOut();
    navigate('/signin');
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async () => {
    try {
      // update displayName
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
      }

      // update firestore user data
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        name,
      });

      toast.success('Profile updated successfully.');
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
              className={!isEdit ? 'profileEmail' : 'profileEmailActive'}
              placeholder='Name'
              value={email}
              onChange={handleChange}
              disabled={!isEdit} />
          </form>
        </div>
      </main>
    </div>
  )
}

export default Profile;
