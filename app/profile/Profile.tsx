'use client';

import React, { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './Profile.module.css';

type FormValues = {
  email: string;
  password?: string;
  lastFrostDate: string;
  firstFrostDate: string;
  zipcode: number;
  fertilize: boolean;
  fertilizeWeeks: string;
};

const pb = new PocketBase('http://127.0.0.1:8090');

const ProfilePage = () => {

  const currentUser = pb.authStore.model;

  const { register, handleSubmit, reset, watch } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Preload form with user data
  useEffect(() => {
    if (currentUser) {
      reset({
        email: currentUser.email,
        lastFrostDate: currentUser.lastFrostDate || '',
        firstFrostDate: currentUser.firstFrostDate || '',
        zipcode: currentUser.zipcode || 0,
        fertilize: currentUser.fertilize,
        fertilizeWeeks: currentUser.fertilize_weeks
      });
    }
  }, [reset]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!currentUser) {
      setMessage("You're not logged in.");
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const updateData = {
        email: data.email,
        lastFrostDate: data.lastFrostDate,
        firstFrostDate: data.firstFrostDate,
        zipcode: data.zipcode,
        fertilize: data.fertilize,
        fertilize_weeks: data.fertilizeWeeks
      };

      // Only include password if filled
      if (data.password) {
        Object.assign(updateData, {
          password: data.password,
          passwordConfirm: data.password, // Required by PocketBase
        });
      }

      const updatedUser = await pb.collection('users').update(currentUser.id, updateData);
      pb.authStore.save(pb.authStore.token, updatedUser); // update authStore with new info
      setMessage('Profile updated successfully!');
    } catch (err: any) {
      console.error(err);
      setMessage(err?.message || 'Update failed.');
    }

    setLoading(false);
  };

  if (!currentUser) {
    return <p>You must be logged in to view this page.</p>;
  }
  const fertilizeChecked = watch('fertilize', false);

  return (
    <>
      {loading && <p>Updating...</p>}
      {message && <p>{message}</p>}
      <div className={styles.profileWrapper}>
        <h1>User Profile</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputDiv}>
            <input className={styles.profileInput} type="email" placeholder="Email" {...register('email')} required />
            <img src="/icons/user.svg" alt='mySvgImage' />
          </div>
          <div className={styles.inputDiv}>
            <input className={styles.profileInput} type="text" placeholder="Preferred Name" {...register('name')} />
            <img src="/icons/user.svg" alt='mySvgImage' />
          </div>
          <div className={styles.inputDiv}>
            <input className={styles.profileInput} type="password" placeholder="Password" {...register('password')} required />
            <img src="/icons/lock-solid.svg" alt='mySvgImage' />
          </div>
          <div className={styles.inputDiv}>
            <input className={styles.profileInput} type="password" placeholder="Confirm Password" {...register('passwordConfirm')} required />
            <img src="/icons/lock-solid.svg" alt='mySvgImage' />
          </div>
          <div className={styles.profileFormDiv}>
            <div>
              <input className={styles.checkbox} type="checkbox" {...register('fertilize')}/>
              <label className={styles.boldLabel}>Send Reminder to Fertilize</label>
            </div>
            {fertilizeChecked && (
              <select {...register('fertilizeWeeks')}>
                <option>Every Week</option>
                <option>Every 2 Weeks</option>
                <option>Every 3 Weeks</option>
                <option>Every 4 Weeks</option>
              </select>
            )}
          </div>
          
          <div className={styles.profileFormDiv}>
            <p className={styles.boldLabel}>Input needed for Timeline</p>
            <label>Last Frost Date</label>
            <input className={styles.profileInput} type="date" {...register('lastFrostDate')} />
            <label>First Frost Date</label>
            <input className={styles.profileInput} type="date" {...register('firstFrostDate')} />
            <p className={styles.boldLabel}> OR </p>
            <label>Zipcode</label>
            <input className={styles.profileInput} type="text" {...register('zipcode')} />
          </div>
          <input className={styles.profileButton} type="submit" value="Update Profile" disabled={loading} />      
        </form>
      </div>
    </>
  );
};

export default ProfilePage;