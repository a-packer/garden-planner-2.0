import { describe, it, beforeEach, vi, expect } from 'vitest';
import saveSelectedPlants from './saveSelectedPlants';
import pb from '@/lib/pb';
vi.mock('@/lib/pb', () => ({default: {collection: vi.fn(),},}));

describe('saveSelectedPlants', () => {
  const userId = 'user-123';
  const mockCollection = {
    getFullList: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
  };
  beforeEach(() => {
    vi.clearAllMocks();
    (pb.collection as any).mockReturnValue(mockCollection);
  });

  it('creates new records and deletes unselected ones', async () => {
    const userPlants = [
      { id: 'plant-1', species: 'Tomato' },
      { id: 'plant-2', species: 'Spinach' },
    ];
    const existingRecords = [
      { id: 'rec-1', plant_id: 'plant-1' }, // still selected
      { id: 'rec-2', plant_id: 'plant-3' }, // should be deleted
    ];

    mockCollection.getFullList.mockResolvedValue(existingRecords);
    await saveSelectedPlants(userId, userPlants);

    //fetch existing records
    expect(mockCollection.getFullList).toHaveBeenCalledWith({
      filter: `user_id = "${userId}"`
    });
    // create missing plant (Spinach)
    expect(mockCollection.create).toHaveBeenCalledTimes(1);
    expect(mockCollection.create).toHaveBeenCalledWith({
      user_id: userId,
      plant_id: 'plant-2'
    });
    // delete unselected plant
    expect(mockCollection.delete).toHaveBeenCalledTimes(1);
    expect(mockCollection.delete).toHaveBeenCalledWith('rec-2');
  });

  it('does nothing when backend already matches selected plants', async () => {
    const userPlants = [
      { id: 'plant-1', species: 'Tomato' },
    ];
    const existingRecords = [
      { id: 'rec-1', plant_id: 'plant-1' },
    ];
    mockCollection.getFullList.mockResolvedValue(existingRecords);
    await saveSelectedPlants(userId, userPlants);
    expect(mockCollection.create).not.toHaveBeenCalled();
    expect(mockCollection.delete).not.toHaveBeenCalled();
  });

  it('handles errors', async () => {
    // configures mock to simulate a network failure
    mockCollection.getFullList.mockRejectedValue(
      new Error('Network error')
    );
    // create vitest spy
    const consoleSpy = vi
      .spyOn(console, 'error')
      // replace the actual console output with a no-op function preventing test noise
      .mockImplementation(() => {});
    // call function, but it's set to reject, triggering error-handling logic
    await saveSelectedPlants(userId, []);
    // assert console.error was called
    expect(consoleSpy).toHaveBeenCalled();
    // clean up by restoring the original console.error behavior preventing side effects
    consoleSpy.mockRestore();
  });
});