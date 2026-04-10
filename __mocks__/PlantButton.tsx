import React from 'react';

const PlantButtonMock = ({ plant, isSelected, onToggle }) => {
  return (
    <div className="plant-token-wrapper">
      <input
        type="checkbox"
        id={plant.id}
        name={plant.species}
        checked={isSelected}
        data-testid={`plant-${plant.species}`}
        onChange={(e) =>onToggle(plant, e.target.checked)}
      />
      <label htmlFor={plant.id}>
        {plant.species}
      </label>
    </div>
  );
};

export default PlantButtonMock;
