"use client"

import React, { useEffect, useState } from 'react';
import pb from '@/lib/pb';
import GuideChartArea from './GuideChartArea';
import PlantList from './PlantList';

const GardenPlanner = () => {

  const [name, setName] = useState('')
  const [selectedPlants,  setSelectedPlants] = useState([])
  const frostDate = '05/01'

  useEffect(()=> {
    const user = pb.authStore.model;
    setName(user?.name)
  }, [])
  
  return (
    <div>
      <h1>{name}'s GardenPlanner</h1>
      <PlantList selectedPlants={selectedPlants} setSelectedPlants={setSelectedPlants} />
      <GuideChartArea selectedPlants={selectedPlants} frostDate={frostDate} />
    </div>
  )
}

export default GardenPlanner