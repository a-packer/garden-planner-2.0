import React, {useState} from 'react';
import Plant from './Plant';
import './PlantList.css';
import pb from '@/lib/pb';

const PlantList = ({selectedPlants, setSelectedPlants}) => {
  const [listOfPlants, setListOfPlants] = useState([])
  const [plantsDisplayed, setPlantDisplayed] = useState(false)

  const displayPlants = async (e) => {
    e.preventDefault();
    const plantData = await pb.collection('plants').getFullList()
    setListOfPlants(plantData)
    setPlantDisplayed(true);
};
  const hidePlants = () => {
    setPlantDisplayed(false)
  }


  return (
    <div className="plantList-wrapper">

     <button 
        onClick={plantsDisplayed ? hidePlants : displayPlants} 
        className="plant-list-button">
        {plantsDisplayed ? 'Hide Plant List' : 'Display Plant List'}
     </button>

     <form className={plantsDisplayed ? "plantList-form" : "plantList-form-hidden"}>
      {listOfPlants.map((plant) => <Plant id={plant.id} plant={plant} selectedPlants={selectedPlants} setSelectedPlants={setSelectedPlants}/>)}   
     </form>
      
    </div>

  )
}

export default PlantList