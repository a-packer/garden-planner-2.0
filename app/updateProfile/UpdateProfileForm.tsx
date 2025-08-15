"use client"

import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import {FormValues} from '../types';
import { ProfileForm } from '../components/ProfileForm/ProfileForm';
import pb from '@/lib/pb';

const UpdateProfileForm = () => {
  const [isLoading, setLoading] = useState(false);
  const [isRegistered, setIsUpdated] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log('testing update profile form', data)
    setLoading(true);

    const userId = pb.authStore.model?.id;
    if (!userId) {
      alert("User not authenticated");
      setLoading(false);
      return;
    }

      console.log(await pb.collection('users').update(userId, {
        email: data.email,
        name: data.name,
        fertilize_reminder: data.fertilize,
        fertilize_weeks: data.fertilizeWeeks,
        last_frost: data.lastFrostDate,
        first_frost: data.firstFrostDate,
        zipcode: data.zipcode}))

      // TODO: fix the frost date not populating properly on the update profile page
      // TODO: save zip vs frost date toggle value using new data column: 'plan_by_zip'
      // TODO: update seems not to be working

    try {
      await pb.collection('users').update(userId, {
      email: data.email,
      name: data.name,
      fertilize_reminder: data.fertilize,
      fertilize_weeks: data.fertilizeWeeks,
      last_frost: data.lastFrostDate,
      first_frost: data.firstFrostDate,
      zipcode: data.zipcode,
    });

      setIsUpdated(true);
    } catch (err: any) {
      console.error(err);
      alert('Update of Profile failed: ' + (err.message || 'Unknown error'));
    }

    setLoading(false);
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isRegistered && <h1>Successfully registered!</h1>}
      <ProfileForm onSubmit={onSubmit} action={"Update Profile"} />
      
    </>
  );
}

export default UpdateProfileForm;