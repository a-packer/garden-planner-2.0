"use client"

import React, { useEffect, useState } from 'react';
import pb from '@/lib/pb';
import { RecordModel } from 'pocketbase';
// import GuideChartArea from './GuideChartArea';
import PlantList from './PlantList';
import {getPlantDataById} from './GuideChartArea/HelperFunctions'

const GardenPlanner = () => {

  const [name, setName] = useState('')
  const [selectedPlantsData, setSelectedPlantsData] = useState<RecordModel[]>([])
  // const frostDate = '05/01'

  useEffect(()=> {
    const user = pb.authStore.model;
    setName(user?.name);

    const fetchUserPlantData = async () => {
      const userId = user?.id;
      const userPlants = await pb.collection('users_plants').getFullList({filter: `user_id = "${userId}"`});
      const userPlantIds = userPlants.map(userPlant => userPlant.plant_id);
      const getUserPlantsData = async (plantIds: string[]) => {
        const plantsData: RecordModel[] = [];
        for (const plantId of plantIds) {
          const plantData = await getPlantDataById(plantId);
          if (plantData) {
            plantsData.push(plantData);
          }
        }
        return plantsData;
      }
      const userPlantData = await getUserPlantsData(userPlantIds);
      setSelectedPlantsData(userPlantData);
    }
    fetchUserPlantData();
  }, [])
  
  return (
    <div>
      <h1>{name}'s GardenPlanner</h1>
      <PlantList userPlants={selectedPlantsData} setSelectedPlants={setSelectedPlantsData} />
      {/* <GuideChartArea selectedPlantDataProp={selectedPlantData} frostDate={frostDate} /> */}
    </div>
  )
}

export default GardenPlanner