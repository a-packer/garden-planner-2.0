'use client'

import React, {useState} from 'react'
import styles from './LoginForm.module.css'

const LoginForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    console.log('login', username, password)
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
  
        if (response.ok) {
            const result = await response.json();
            setMessage(result.message);
        } else {
            setMessage('Invalid username or password. Please Try again');
        }
    } catch (error) {
        setMessage('Error logging in');
    }
  };
  return (
    <div className={styles.loginRegWrapper}>
      <form onSubmit={handleSubmitLogin}>
          <div className={styles.loginRegFormDiv}>
              <input 
                  placeholder="username" 
                  type='text'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className={styles.loginRegInput} />
          </div>
          <div className={styles.loginRegFormDiv}>
              <input 
              placeholder="password" 
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.loginRegInput} />
          </div>
          <button className={styles.loginRegButton} type='submit'>Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default LoginForm