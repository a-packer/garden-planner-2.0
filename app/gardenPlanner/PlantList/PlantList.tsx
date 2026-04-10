import React, {useState} from 'react';
import PlantButton from './PlantButton';
import './PlantList.css';
import pb from '@/lib/pb';
import saveSelectedPlants from './saveSelectedPlants';

type UserPlant = {
  collectionId: string;
  collectionName: string;
  id: string;
  picture: string;
  planting_tips: string | null;
  rel_weeks_inside: number;
  rel_weeks_outside: number;
  seed_purchase_link: string;
  species: string;
  weeks_total_growth: number;
};

const PlantList = ({
  selectedPlants, setSelectedPlants}: 
  {selectedPlants: UserPlant[], setSelectedPlants: React.Dispatch<React.SetStateAction<any[]>>}) => {

  const [listOfPlants, setListOfPlants] = useState<UserPlant[]>([])
  const [plantsDisplayed, setPlantDisplayed] = useState<Boolean>(false)

  const displayPlants = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const plantData: UserPlant[] = await pb.collection('plants').getFullList();
    setListOfPlants(plantData);
    setPlantDisplayed(true);
};
  const hidePlants = () => {
    setPlantDisplayed(false)
  }

  const togglePlant = (plant: UserPlant, checked: Boolean) => {
    setSelectedPlants(selectedPlants => { 
      if (checked) { 
        return selectedPlants.some(p => p.species === plant.species) ? selectedPlants : [...selectedPlants, plant];
      } 
      else { 
        return selectedPlants.filter(userPlant => userPlant.species !== plant.species);
      } 
    }); 
  }
  
  return (
    <div className="plantList-wrapper">
     <button 
        onClick={plantsDisplayed ? hidePlants : displayPlants} 
        className="plant-list-button">
        {plantsDisplayed ? 'Hide Plant List' : 'Display Plant List'}
     </button>
      <button 
        onClick={() => saveSelectedPlants(pb.authStore.model?.id || '', selectedPlants)} 
        className="save-list-button">
        Save Plan
     </button>

     <form role="form" className={plantsDisplayed ? "plantList-form" : "plantList-form-hidden"}>
        <div className="plant-container">
          {listOfPlants?.map((plant) => 
            <PlantButton 
              key={plant.id} 
              plant={plant} 
              isSelected={selectedPlants.some(userPlant => userPlant.species === plant.species)} 
              onToggle={togglePlant}
            />
          )}   
        </div>
     </form>     
    </div>
  )
}

export default PlantList;