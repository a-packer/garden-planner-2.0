'use client'

import React, {useState, useEffect} from 'react';
import './Header.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import pb from '@/lib/pb';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
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

  if (isAuthenticated === null) {
    // avoid hydration error by rendering nothing until client knows
    return <div className="pageHeaderWrapper"></div>
  }

  return (
    <div className='pageHeaderWrapper'>
      {isAuthenticated ? 
        <>        
          <Link href="/" className="tableHeaderTitle">Planting Schedule</Link>
          <Link href="/updateProfile" className='pageHeaderNavButton'>Profile</Link>
          <Link href="/gardenPlanner" className='pageHeaderNavButton'>GardenPlanner</Link>
          <button onClick={handleLogout} className='pageHeaderLogout'>Logout</button>
        </>
        :
        <>  
          <Link href="/" className="tableHeaderTitle">Planting Schedule</Link>    
          <Link href="/login" className='pageHeaderNavButton'>Login</Link>
          <Link href="/register" className='pageHeaderNavButton'>Register</Link>
        </>
      }
    </div>
  )
}

export default Header;