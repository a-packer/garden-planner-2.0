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
  toggleType: string;
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

  const fertilizeChecked = watch('fertilize', false);
  const toggleValue = watch('toggleType', 'frost');
  const toggleFrostClass = toggleValue === 'frost' ? styles.toggleOptionActive : styles.toggleOption
  const toggleZipClass = toggleValue === 'zip' ? styles.toggleOptionActive : styles.toggleOption

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
              <img src="/icons/email.svg" alt='mySvgImage' />
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
                <label className={styles.boldLabel}>Reminder to Fertilize</label>
              </div>
              {fertilizeChecked && (
                <div className={styles.inputDiv}>
                  <select {...register('fertilizeWeeks')}>
                    <option>Every Week</option>
                    <option>Every 2 Weeks</option>
                    <option>Every 3 Weeks</option>
                    <option>Every 4 Weeks</option>
                  </select>          
                  <img src="/icons/timer.svg" alt='mySvgImage' />
              </div>)}
            </div>
            
            <div className={styles.regFormDiv}>
              <p className={styles.boldLabel}>Create Timeline based on</p>

              <div className={styles.toggleContainer}>      
                <label className={toggleFrostClass} >
                  <input
                    type="radio"
                    value="frost"
                    {...register('toggleType')}
                    className={styles.hiddenRadio}
                  />
                  Frost Date
                </label>
                <label className={toggleZipClass}>
                  <input
                    type="radio"
                    value="zip"
                    {...register('toggleType')}
                    className={styles.hiddenRadio}
                  />
                  Zipcode
                </label>
              </div>

              {toggleValue == 'frost' && (  
                <>
                <label>Last Frost Date</label>
                <div className={styles.inputDiv}>                
                  <input className={styles.regInput} 
                    type="text" 
                    placeholder="mm/dd"
                    {...register('lastFrostDate')} 
                  />
                  <img src="/icons/date.svg" alt='mySvgImage' />
                </div>             
                <label>First Frost Date</label>
                <div className={styles.inputDiv}>
                  <input className={styles.regInput} 
                    type="text" 
                    placeholder="mm/dd"
                    {...register('firstFrostDate')} />
                  <img src="/icons/date.svg" alt='mySvgImage' />
                </div>
                </>
              )}
              {toggleValue == 'zip' && (
                <>
                <label>Zipcode</label>
                <div className={styles.inputDiv}>
                  <input className={styles.regInput} type="text" {...register('zipcode')} />
                  <img src="/icons/location.svg" alt='mySvgImage' />
                </div>
                </>
              )}


            </div>
            <input className={styles.regButton} type="submit" disabled={isLoading} value="Register" />
          </form>
        </div>
      )}
    </>
  );
}

export default RegisterForm