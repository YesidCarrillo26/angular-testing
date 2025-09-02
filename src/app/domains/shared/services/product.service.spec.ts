import { createHttpFactory, HttpMethod, SpectatorHttp } from "@ngneat/spectator/jest";
import { ProductService } from "./product.service";
import { environment } from "@env/environment";

describe('ProductService', () => {
  let spectator: SpectatorHttp<ProductService>;
  const createService = createHttpFactory(ProductService);

  beforeEach(() => {
    spectator = createService();
  });

  it('can test HttoClient', () => {
    spectator.service.getOne('123').subscribe();

    const url = `${environment.apiUrl}/api/v1/products/123`;
    spectator.expectOne(url, HttpMethod.GET);
  })

  // More tests can be added here to cover different scenarios
  it('can test getProducts with category_id', () => {
    spectator.service.getProducts({ category_id: '456' }).
      subscribe();

    const url = new URL(`${environment.apiUrl}/api/v1/products`);
    url.searchParams.set('categoryId', '456');
    spectator.expectOne(url.toString(), HttpMethod.GET);
  });

  it('can test getProducts with category_slug', () => {
    spectator.service.getProducts({ category_slug: 'electronics' }).
      subscribe();
    const url = new URL(`${environment.apiUrl}/api/v1/products`);
    url.searchParams.set('categorySlug', 'electronics');
    spectator.expectOne(url.toString(), HttpMethod.GET);
  });

  it('can test getRelatedProducts', () => {
    spectator.service.getRelatedProducts('some-slug').subscribe();
    const url = `${environment.apiUrl}/api/v1/products/slug/some-slug/related`;
    spectator.expectOne(url, HttpMethod.GET);
  });

  it('should handler api failure', () => {
    const errorResponse = { status: 500, statusText: 'Server Error' };
    spectator.service.getOne('123').subscribe({
      error: (error) => {
        expect(error.status).toBe(500);
      }
    });

    const url = `${environment.apiUrl}/api/v1/products/123`;
    spectator.expectOne(url, HttpMethod.GET).flush(null, errorResponse);
  });

})
