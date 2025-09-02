import { createHttpFactory, HttpMethod, SpectatorHttp } from "@ngneat/spectator/jest";
import { CategoryService } from "./category.service";
import { environment } from "@env/environment";
import { Category } from "@shared/models/category.model";

import fetchMock, { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks();

describe('CategoryService', () => {
  let spectator: SpectatorHttp<CategoryService>;
  const createService = createHttpFactory(CategoryService);

  beforeEach(() => {
    spectator = createService();
    fetchMock.resetMocks();
  });

  it('should get all categories (Observable)', () => {
    const mockCategories: Category[] = [
      { id: 1, name: 'Cat 1', image: '', slug: 'cat-1' }
    ];

    spectator.service.getAll().subscribe(data => {
      expect(data).toEqual(mockCategories);
    });

    const url = `${environment.apiUrl}/api/v1/categories`;
    spectator.expectOne(url, HttpMethod.GET).flush(mockCategories);
  });

  it('should get all categories (Promise)', async () => {
    const mockCategories: Category[] = [
      { id: 1, name: 'Cat 1', image: '', slug: 'cat-1' }
    ];

    // Mock global fetch
    fetchMock.mockResponseOnce(JSON.stringify(mockCategories));

    const result = await spectator.service.getAllPromise();
    expect(result).toEqual(mockCategories);

    fetchMock.mockRestore();
  });

  // error fetch
  it('should handle fetch error', async () => {
    fetchMock.mockRejectOnce(new Error('Fetch error'));
    await expect(spectator.service.getAllPromise()).rejects.toThrow('Fetch error');
    fetchMock.mockRestore();
  });
  
})
