"use client"

import React, { useState } from 'react';
import PocketBase from 'pocketbase';
import { SubmitHandler } from 'react-hook-form';
import {FormValues} from '../types';
import { ProfileForm } from '../components/ProfileForm/ProfileForm';

const UpdateProfileForm = () => {
  const [isLoading, setLoading] = useState(false);
  const [isRegistered, setIsUpdated] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log('testing update profile form')
    setLoading(true);
    const pb = new PocketBase('http://127.0.0.1:8090');

    if (data.password !== data.passwordConfirm) {
      alert('Passwords do not match');
      setLoading(false);
      return;
    }

    const userId = pb.authStore.model?.id;
    console.log('userId', userId)
    if (!userId) {
      alert("User not authenticated");
      setLoading(false);
      return;
    }

    try {
      await pb.collection('users').update(userId, {
      email: data.email,
      name: data.name,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
      fertilize_reminder: data.fertilize,
      fertilize_weeks: data.fertilizeWeeks,
      last_frost: data.lastFrostDate,
      first_frost: data.firstFrostDate,
      zipcode: data.zipcode,
    });

      await pb.collection('users').authWithPassword(data.email, data.password);
      setIsUpdated(true);
    } catch (err: any) {
      console.error(err);
      alert('Registration failed: ' + (err.message || 'Unknown error'));
    }

    setLoading(false);
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isRegistered ? (
        <h1>Successfully registered!</h1>
      ) : ( <ProfileForm onSubmit={onSubmit} action={"Update Profile"} />)}
    </>
  );
}

export default UpdateProfileForm;