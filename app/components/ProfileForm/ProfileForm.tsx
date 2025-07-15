"use client"

import React, {useState} from 'react';
import styles from './Profile.module.css';
import { useForm } from 'react-hook-form';
import { FormValues } from '../../types';

export const ProfileForm = ({onSubmit}:any) => {

  const { register, handleSubmit, watch } = useForm<FormValues>();
  const fertilizeChecked = ''
  
  const toggleValue = watch('toggleType', 'frost');
  const toggleFrostClass = toggleValue === 'frost' ? styles.toggleOptionActive : styles.toggleOption
  const toggleZipClass = toggleValue === 'zip' ? styles.toggleOptionActive : styles.toggleOption

  const [isLoading, setLoading] = useState(false);

  return (
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
            <p className={styles.boldLabel}>Create Timeline based on</p>
            <label className={styles.switch}>
            <input type="checkbox" {...register('fertilize')} />
            <span className={styles.slider}></span>
            </label>
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
            <p className={styles.boldLabel}>Email Fertilizer Reminder</p>

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
  )
}
