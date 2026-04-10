import React from 'react';
import { describe, it, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import pbMock from '../../../__mocks__/pb';
vi.mock('@/lib/pb', () => ({default: pbMock}));
import {PlantButtonMock, mockPlants} from '../../../__mocks__';
vi.mock('./PlantButton', () => ({default: PlantButtonMock}));
import PlantList from './PlantList';
import saveSelectedPlants from './saveSelectedPlants';

describe('PlantList', () => {
    const setSelectedPlants = vi.fn();
    beforeEach(() => {
        vi.clearAllMocks();
        pbMock.collection().getFullList.mockResolvedValue(mockPlants);
    });

    it('adds a plant when checkbox is checked and plant is not already selected', async () => {
        render(<PlantList selectedPlants={[]} setSelectedPlants={setSelectedPlants} />);
        fireEvent.click(screen.getByText('Display Plant List'));
        const plantCheckbox = await screen.findByTestId('plant-Basil');
        fireEvent.click(plantCheckbox);
        expect(setSelectedPlants).toHaveBeenCalledTimes(1);
        const updater = setSelectedPlants.mock.calls[0][0];
        const newState = updater([]);
        expect(newState).toEqual([mockPlants[1]]);
    });

    it('removes a plant when plant checkbox is unchecked and plant is already selected', async () => {
        render(<PlantList selectedPlants={[mockPlants[1]]} setSelectedPlants={setSelectedPlants} />);
        // display plants
        fireEvent.click(screen.getByText('Display Plant List'));
        const plantCheckbox = await screen.findByTestId('plant-Basil');
        // simulate unchecking the box
        fireEvent.click(plantCheckbox);
        // check to make sure state update function has been called
        expect(setSelectedPlants).toHaveBeenCalled();
        // grab the updater
        const togglePlantUpdater = setSelectedPlants.mock.calls[0][0];
        // simulate React state update starting from [Basil]
        const newState = togglePlantUpdater([mockPlants[1]]);
        expect(newState).toEqual([]);
    });

    it('hides plants when Hide Plant List button clicked', async () => {
        render(<PlantList selectedPlants={[]} setSelectedPlants={setSelectedPlants} />);
        fireEvent.click(screen.getByText('Display Plant List'));
        const form = await screen.findByRole('form');
        expect(form).toHaveClass('plantList-form');
        fireEvent.click(screen.getByText('Hide Plant List'));
        expect(form).toHaveClass('plantList-form-hidden');
    })

    it('calls pb.create with selected plants when Save Plants clicked', async () => {
       // set up mock database
       pbMock.collection().getFullList.mockResolvedValueOnce([]); // no existing plants initially
       // call the function directly with a selected mock plant
        await saveSelectedPlants('user123', [mockPlants[1]]);
       // assert the mock create method was called with selected mock user and plant data
       expect(pbMock.collection().create).toHaveBeenCalledTimes(1);
       expect(pbMock.collection().create).toHaveBeenCalledWith({user_id: 'user123', plant_id: mockPlants[1].id});
    });

});