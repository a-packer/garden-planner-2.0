import TableHeader from './TableHeader';
import GuideChart from './GuideChart';
import './GuideChartArea.css';

const GuideChartArea = ({frostDate, selectedPlantDataProp}) => {
  return (
    <div className="guidechart-wrapper">      
      <div className="guidechart-chart-wrapper">
        <TableHeader />
        <div className="svg-wrapper">
          <GuideChart selectedPlantsData={selectedPlantDataProp} frostDate={frostDate} />
        </div>    
      </div>
    </div>
  )
}

export default GuideChartArea;