import { vi } from 'vitest';

export const getFullList = vi.fn();
export const create = vi.fn();

const pbMock = {
  collection: vi.fn(() => ({
    getFullList,
    create
  })),
  authStore: {
    model: { id: 'user-123' }
  }
}

export default pbMock;