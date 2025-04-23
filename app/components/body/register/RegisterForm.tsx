'use client'

import React, {useState} from 'react';
import styles from './RegisterForm.module.css';

const RegisterForm = () => {

  const [message, setMessage] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    console.log('register', registerUsername, registerPassword)
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ registerUsername, registerPassword }),
      });
      if (response.ok) {
        setMessage("Registration complete");
      } else {
        setMessage('Invalid username or password for registration.');
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
                    placeholder="username"
                    type="text" value={registerUsername}
                    onChange={(e) => setRegisterUsername(e.target.value)}
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
          <button className={styles.loginRegButton} type="submit">Register</button>
        </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default RegisterForm