import React, {useState, useEffect} from 'react';
import TableHeader from './TableHeader';
import GuideChart from './GuideChart';
import {getPlantDataBySpecies} from './HelperFunctions';
import './GuideChartArea.css';

const GuideChartArea = ({selectedPlants, frostDate}) => {

  const [selectedPlantData, setSelectedPlantData] = useState([])

  useEffect(() => {
    if (selectedPlants.length === 0) {
      setSelectedPlantData([]);
      return;
    }

    const fetchPlants = async () => {
      try {
        // Wait for all Promises to resolve
        const plantDataArray = await Promise.all(
          selectedPlants.map((species) => getPlantDataBySpecies(species))
        );
        setSelectedPlantData(plantDataArray);
      } catch (error) {
        console.error("Error fetching plant data:", error);
      }
    };

    fetchPlants();
  }, [selectedPlants]);

  return (
    <div className="guidechart-wrapper">      
      <div className="guidechart-chart-wrapper">
        <TableHeader />
        <div className="svg-wrapper">
          <GuideChart selectedPlantsData={selectedPlantData} frostDate={frostDate} />
        </div>    
      </div>
    </div>
  )
}

export default GuideChartArea;