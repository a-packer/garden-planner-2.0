import pb from '@/lib/pb';
interface Plant {
  id: string;
}
interface UserPlantRecord {
  id: string;
  user_id: string;
  plant_id: string;
}

const saveSelectedPlants = async (userId: string, selectedPlants: Plant[]): Promise<void> => {
  console.log('save plan button clicked -----------')
  try {
    const existingRecords = await pb.collection('users_plants').getFullList<UserPlantRecord>({
      filter: `user_id = "${userId}"`
    });
    console.log('existingRecords: ', existingRecords)
    console.log('selectedPlants', selectedPlants)
    for (const plant of selectedPlants) {
      const existingRecord = existingRecords.find(record => record.plant_id === plant.id);
      if (!existingRecord) {
        console.log("we're about to create")
        await pb.collection('users_plants').create({
          user_id: userId,
          plant_id: plant.id
        });
        console.log('we created')
      }
    }
    for (const record of existingRecords) {
      const isStillSelected = selectedPlants.some(plant => plant.id === record.plant_id);
      if (!isStillSelected) {
        await pb.collection('users_plants').delete(record.id);
      }
    }
    console.log('Plants saved successfully');
  } catch (error) {
    console.error('Error saving plants:', error);
  }
};

  export default saveSelectedPlants;