import './Plant.css';
import React from 'react';

const PlantButton = ({ plant, isSelected, onToggle }) => {
  return (
    <div className="plant-token-wrapper">
      <input
        type="checkbox"
        id={plant.id}
        name={plant.species}
        checked={isSelected}
        onChange={(e) =>
          onToggle(plant, e.target.checked)
        }
      />
      <label htmlFor={plant.id}>
        {plant.species}
      </label>
    </div>
  );
};
export default PlantButton;