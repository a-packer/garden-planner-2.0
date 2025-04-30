'use client'
import React, {useState} from 'react';
import styles from './Profile.module.css'

const Profile = () => {

    // TODO: get profile data from /profile endpoint
    // TODO: fill in placeholder data with current data
 
    const [message, setMessage] = useState('');
    const [updateEmail, setEmail] = useState('');
    const [updatePassword, setUpdatePassword] = useState('');
    const [lastFrostDate, setLastFrostDate] = useState('');
  
    const handleSubmitUpdate = async (e) => {
      e.preventDefault();
      console.log('update', updateEmail, updatePassword)
      try {
        const response = await fetch('/update', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ updateEmail, updatePassword }),
        });
        if (response.ok) {
          setMessage("Registration complete");
        } else {
          setMessage('Invalid email or password for registration.');
        }
      } catch (error) {
        setMessage('Error updateing');
      }
    };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    console.log('login', email, password)
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
  
        if (response.ok) {
            const result = await response.json();
            setMessage(result.message);
        } else {
            setMessage('Invalid email or password. Please Try again');
        }
    } catch (error) {
        setMessage('Error logging in');
    }
  };
  return (
   <div className={styles.loginRegWrapper}>
           <form onSubmit={handleSubmitUpdate}>       
               <div className={styles.loginRegFormDiv}>
                   <input
                       placeholder="email"
                       type="text" value={updateEmail}
                       onChange={(e) => setEmail(e.target.value)}
                       required
                       className={styles.loginRegInput} />
               </div>
               <div className={styles.loginRegFormDiv}>
                   <input
                     placeholder="password"
                     type="password"
                     value={updatePassword}
                     onChange={(e) => setUpdatePassword(e.target.value)}
                     required
                     className={styles.loginRegInput} />
               </div>
               <div className={styles.loginRegFormDiv}>
                   <input
                     placeholder="last frost date"
                     type=""
                     value={lastFrostDate}
                     onChange={(e) => setLastFrostDate(e.target.value)}
                     required
                     className={styles.loginRegInput} />
               </div>
             <button className={styles.loginRegButton} type="submit">Update</button>
           </form>
         {message && <p>{message}</p>}
       </div>
  )
}

export default Profile