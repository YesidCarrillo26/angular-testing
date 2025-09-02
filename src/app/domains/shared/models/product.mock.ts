import { generateMockCategory } from './category.mock';
import { Product } from './product.model';
import { faker } from '@faker-js/faker';

export const createMockProduct = (data?: Partial<Product>): Product => ({
  id: faker.number.int({ min: 1, max: 1000 }),
  title: faker.commerce.productName(),
  price: parseFloat(faker.commerce.price()),
  description: faker.commerce.productDescription(),
  images: [faker.image.url(), faker.image.url()],
  category: generateMockCategory(data?.category),
  creationAt: faker.date.past().toISOString(),
  slug: faker.lorem.slug(),
  ...data,
});