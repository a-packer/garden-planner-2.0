'use client'

import React, {useState, useEffect} from 'react';
import './Header.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import pb from '@/lib/pb';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(pb.authStore.isValid);
  const router = useRouter();

  useEffect(()=> {
    const updateAuth = () => setIsAuthenticated(pb.authStore.isValid);
    updateAuth();
    const removeListener = pb.authStore.onChange(updateAuth);
    return () => removeListener();
  }, []);

  const handleLogout = () => {
    pb.authStore.clear();
    setIsAuthenticated(false);
    router.push('/');
  };

  return (
    <div className='pageHeaderWrapper'>
      {isAuthenticated ? 
        <>        
          <Link href="/" className="tableHeaderTitle">Planting Schedule</Link>
          <Link href="/updateProfile" className='pageHeaderNavButton'>Profile</Link>
          <button onClick={handleLogout} className='pageHeaderNavButton'>Logout</button>
        </>
        :
        <>      
          <Link href="/login" className='pageHeaderNavButton'>Login</Link>
          <Link href="/register" className='pageHeaderNavButton'>Register</Link>
        </>
      }
    </div>
  )
}

export default Header;