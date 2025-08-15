import React, {useState, useEffect} from 'react';
import TableHeader from './TableHeader';
import GuideChart from './GuideChart';
// import {getPlantData} from './HelperFunctions';
import './GuideChartArea.css';

const GuideChartArea = ({selectedPlants, frostDate}) => {

  const [selectedPlantData, setSelectedPlantData] = useState([])

  useEffect(()=> {
    // get plantData
    setSelectedPlantData('');
    // fetchData();
  }, [selectedPlants])

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