import { Category } from './category.model';
import { faker } from '@faker-js/faker';

export const generateMockCategory = (data?: Partial<Category>): Category => ({
  id: faker.number.int({ min: 1, max: 100 }),
  name: faker.commerce.department(),
  image: faker.image.url(),
  slug: faker.lorem.slug(),
  ...data,
});