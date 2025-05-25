import React, { useState } from 'react';
import PocketBase from 'pocketbase';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './RegisterForm.module.css';

type FormValues = {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
  fertilize: boolean;
  fertilizeWeeks: string;
  lastFrostDate: string;
  firstFrostDate: string;
  zipcode: number;
};

const RegisterForm = () => {
  const [isLoading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const { register, handleSubmit, watch } = useForm<FormValues>();

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
        <h1>Successfully registered!</h1>
      ) : (
        <div className={styles.regWrapper}>
          <h1>Register</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputDiv}>
              <input className={styles.regInput} type="email" placeholder="Email" {...register('email')} required />
              <img src="/icons/user.svg" alt='mySvgImage' />
            </div>
            <div className={styles.inputDiv}>
              <input className={styles.regInput} type="text" placeholder="Preferred Name" {...register('name')} />
              <img src="/icons/user.svg" alt='mySvgImage' />
            </div>
            <div className={styles.inputDiv}>
              <input className={styles.regInput} type="password" placeholder="Password" {...register('password')} required />
              <img src="/icons/lock-solid.svg" alt='mySvgImage' />
            </div>
            <div className={styles.inputDiv}>
              <input className={styles.regInput} type="password" placeholder="Confirm Password" {...register('passwordConfirm')} required />
              <img src="/icons/lock-solid.svg" alt='mySvgImage' />
            </div>
            <div className={styles.regFormDiv}>
              <div>
                <input className={styles.checkbox} type="checkbox" {...register('fertilize')}/>
                <label className={styles.boldLabel}>Reminder to Fertilize Every</label>
              </div>
              <select {...register('fertilizeWeeks')}>
                <option>1 Week</option>
                <option>2 Weeks</option>
                <option>3 Weeks</option>
                <option>4 Weeks</option>
              </select>
            </div>
            
            <div className={styles.regFormDiv}>
              <p className={styles.boldLabel}>Input needed for Timeline</p>
              <label>Last Frost Date</label>
              <input className={styles.regInput} type="date" {...register('lastFrostDate')} />
              <label>First Frost Date</label>
              <input className={styles.regInput} type="date" {...register('firstFrostDate')} />
              <p className={styles.boldLabel}> OR </p>
              <label>Zipcode</label>
              <input className={styles.regInput} type="text" {...register('zipcode')} />
            </div>
            <input className={styles.regButton} type="submit" disabled={isLoading} value="Register" />
          </form>
        </div>
      )}
    </>
  );
}

export default RegisterForm