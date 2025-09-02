import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { CartService } from './cart.service';
// import { Product } from '@shared/models/product.model';
// import { createMockProduct } from '../models/product.mock';

describe('CartService', () => {
  let spectator: SpectatorService<CartService>;
  const createService = createServiceFactory(CartService);

  beforeEach(() => (spectator = createService()));

  it('should create the service', () => {
    expect(spectator.service).toBeDefined();
  });

  // add product to cart
  it('should add product to cart', () => {
    // const product: Product = createMockProduct()

    const product = {
      id: 1,
      name: 'Product 1',
      price: 10,
      title: 'Product 1',
      description: 'A test product',
      images: ['test-image.jpg'],
      creationAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: {
        id: 1,
        name: 'Category 1',
        image: 'cat-image.jpg',
        creationAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        slug: 'category-1'
      },
      slug: 'product-1'
    };
    spectator.service.addToCart(product);
    expect(spectator.service.cart()).toEqual([product]);
  });

  //edge cases - total should be 0 if cart is empty
  it('should return total as 0 if cart is empty', () => {
    expect(spectator.service.total()).toBe(0);
  });
  
  // total should be the sum of product prices in cart
  it('should return total as the sum of product prices in cart', () => {
    const product1 = {
      id: 1,
      name: 'Product 1',
      price: 10,
      title: 'Product 1',
      description: 'A test product',
      images: ['test-image.jpg'],
      creationAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: {
        id: 1,
        name: 'Category 1',
        image: 'cat-image.jpg',
        creationAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        slug: 'category-1'
      },
      slug: 'product-1'
    };
    const product2 = {
      id: 2,
      name: 'Product 2',
      price: 20,
      title: 'Product 2',
      description: 'Another test product',
      images: ['test-image2.jpg'],
      creationAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: {
        id: 2,
        name: 'Category 2',
        image: 'cat-image2.jpg',
        creationAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        slug: 'category-2'
      },
      slug: 'product-2'
    };
    spectator.service.addToCart(product1);
    spectator.service.addToCart(product2);
    expect(spectator.service.total()).toBe(30);
  });
});