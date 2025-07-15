"use client"

import React from 'react'
import {ProfileForm} from '../components/ProfileForm/ProfileForm';

const onSubmit = () => {console.log("update profile")}

const profile = () => {
  return (
    <ProfileForm onSubmit={onSubmit} />
  )
}
export default profile