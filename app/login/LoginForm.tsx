'use client';

import React, { useState } from 'react';
import pb from '@/lib/pb';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import styles from './LoginForm.module.css';

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setErrorMsg('');

    try {
      const authData = await pb.collection('users').authWithPassword(data.email, data.password);
      router.push('/gardenPlanner');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || 'Login failed');
    }

    setIsLoading(false);
  };

  return (
    <div className={styles.loginWrapper}>
      <h1>Login</h1>
      {isLoading && <p>Logging in...</p>}
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputDiv}>
          <input className={styles.loginInput} type="email" placeholder="Email" {...register('email')} required />
          <img src="/icons/user.svg" alt='mySvgImage' />
        </div>
        <div className={styles.inputDiv}>
          <input className={styles.loginInput} type="password" placeholder="Password" {...register('password')} required />
          <img src="/icons/lock-solid.svg" alt='mySvgImage' />
        </div>
        <input className={styles.loginButton} type="submit" value="Login" disabled={isLoading} />
      </form>

      {user && (
        <div>
          <h2>Welcome, {user.email}</h2>
        </div>
      )}
    </div>
  );
};

export default LoginPage;