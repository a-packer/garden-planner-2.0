'use client'

import React, {useState} from 'react';
import './Header.css';
import Link from 'next/link';

const Header = () => {

  // eventually put this in user data
  const [frostDate, setFrostDate ] = useState()

  return (
    <div className='pageHeaderWrapper'>
      <Link href="/" className="tableHeaderTitle">Planting Schedule</Link>
      <Link href="/login" className='pageHeaderNavButton'>Login</Link>
      <Link href="/register" className='pageHeaderNavButton'>Register</Link>
      <Link href="/profile" className='pageHeaderNavButton'>Profile</Link>
    </div>
  )
}

export default Header