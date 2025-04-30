'use client'

import React, {useState} from 'react';
import styles from './RegisterForm.module.css';

const RegisterForm = () => {

  const [message, setMessage] = useState('');
  const [registerName, setName] = useState('');
  const [registerEmail, setEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [lastFrostDate, setLastFrostDate] = useState('');

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    console.log('register', registerEmail, registerPassword)
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ registerEmail, registerPassword }),
      });
      if (response.ok) {
        setMessage("Registration complete");
      } else {
        setMessage('Invalid email or password for registration.');
      }
    } catch (error) {
      setMessage('Error registering');
    }
  };

  return (
    <div className={styles.loginRegWrapper}>
        <form onSubmit={handleSubmitRegister}>  
            <div className={styles.loginRegFormDiv}>
                <input
                    placeholder="name"
                    type="text" value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={styles.loginRegInput} />
            </div>         
            <div className={styles.loginRegFormDiv}>
                <input
                    placeholder="email"
                    type="text" value={registerEmail}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={styles.loginRegInput} />
            </div>
            <div className={styles.loginRegFormDiv}>
                <input
                  placeholder="password"
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
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
          <button className={styles.loginRegButton} type="submit">Register</button>
        </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default RegisterForm