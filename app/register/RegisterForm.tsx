"use client"

import React, { useState } from 'react';
import PocketBase from 'pocketbase';
import { SubmitHandler } from 'react-hook-form';
import {FormValues} from '../types';
import { ProfileForm } from '../components/ProfileForm/ProfileForm';
import Link from 'next/link';

const RegisterForm = () => {
  const [isLoading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    const pb = new PocketBase('http://127.0.0.1:8090');

    if (data.password !== data.passwordConfirm) {
      alert('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await pb.collection('users').create({
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
      setIsRegistered(true);
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
        <div>
          <h1>Successfully registered!</h1>
          <div>
            <Link href="/">Home Page</Link>
            <Link href="/gardenPlanner">Garden Planner</Link>
          </div>
        </div>
      ) : ( <ProfileForm onSubmit={onSubmit} action={"Register"} />)}
    </>
  );
}

export default RegisterForm