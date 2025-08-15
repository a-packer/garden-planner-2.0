"use client"

import React, {useState, useEffect} from 'react';
import styles from './Profile.module.css';
import { useForm } from 'react-hook-form';
import { FormValues } from '../../types';
import pb from '@/lib/pb';

export const ProfileForm = ({onSubmit, action}:any) => {

  const { register, handleSubmit, watch, reset } = useForm<FormValues>();
  
  const fertilizeChecked = watch('fertilize', false);
  const toggleValue = watch('toggleType', 'frost');
  const toggleFrostClass = toggleValue === 'frost' ? styles.toggleOptionActive : styles.toggleOption
  const toggleZipClass = toggleValue === 'zip' ? styles.toggleOptionActive : styles.toggleOption

  const [isLoading, setLoading] = useState(false);
  const isUpdate = action == "Update Profile" ? true : false

  useEffect(()=> {
    const user = pb.authStore.model;
    if (user) {
        reset({
            email: user.email,
            name: user.name,
            toggleType: user.toggleType || 'frost',
            fertilize:  user.fertilize_reminder,
            fertilizeWeeks: user.fertilize_weeks,
            lastFrostDate: user.last_frost,
            firstFrostDate: user.first_frost,
            zipcode: user.zipcode
        });
    }
  }, [reset])

  return (
    <div className={styles.regWrapper}>
        <h1>{action}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputDiv}>
            <input className={styles.regInput} type="email" placeholder="Email" {...register('email')} />
            <img src="/icons/email.svg" alt='mySvgImage' />
        </div>
        <div className={styles.inputDiv}>
            <input className={styles.regInput} type="text" placeholder="Preferred Name" {...register('name')} />
            <img src="/icons/user.svg" alt='mySvgImage' />
        </div>

        {!isUpdate && 
            <>
                <div className={styles.inputDiv}>
                    <input className={styles.regInput} type="password" placeholder="Password" {...register('password')} />
                    <img src="/icons/lock-solid.svg" alt='mySvgImage' />
                </div>
                <div className={styles.inputDiv}>
                    <input className={styles.regInput} type="password" placeholder="Confirm Password" {...register('passwordConfirm')} />
                    <img src="/icons/lock-solid.svg" alt='mySvgImage' />
                </div>
            </>
        }
        <div className={styles.regFormDiv}>
            <p className={styles.boldLabel}>Email Fertilizer Reminder</p>
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
        <input className={styles.regButton} type="submit" disabled={isLoading} value={action} />
        </form>
    </div>
  )
}
