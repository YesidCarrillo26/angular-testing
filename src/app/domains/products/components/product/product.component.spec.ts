import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { ProductComponent } from './product.component';
import { Product } from '@shared/models/product.model';
import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute

describe('ProductComponent', () => {
  let spectator: Spectator<ProductComponent>;
  const createComponent = createComponentFactory({
    component: ProductComponent,
    providers: [
      {
        provide: ActivatedRoute,
        useValue: {} // Mock vacío, ajusta si necesitas datos específicos
      }
    ]
  });

  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    description: 'This is a test product',
    price: 100,
    images: ['image1.jpg', 'image2.jpg'],
    category: {
      id: 1,
      name: 'Test Category',
      image: 'category.jpg',
      slug: 'test-category',
    },
    creationAt: '2023-01-01',
    slug: 'test-product',
  };

  beforeEach(() => {
    spectator = createComponent({
      props: {
        product: mockProduct,
      }
    });
  });

  it('should create', () => {
    spectator.detectChanges();
    expect(spectator.component).toBeTruthy();
  });

  // display title
  

  // it('should have the correct product input', () => {
  //   expect(spectator.component.product()).toEqual(mockProduct);
  // });

  // it('should emit addToCart with product when addToCartHandler is called', () => {
  //   jest.spyOn(spectator.component.addToCart, 'emit');
  //   spectator.component.addToCartHandler();
  //   expect(spectator.component.addToCart.emit).toHaveBeenCalledWith(mockProduct);
  // });

  // it('should render product name in template', () => {
  //   spectator.setInput('product', mockProduct);
  //   spectator.detectChanges();
  //   expect(spectator.query('app-product')).toBeTruthy();
  //   // If you have an element showing the name, e.g. <span>{{ product().name }}</span>
  //   // expect(spectator.query('span')).toHaveText('Test Product');
  // });

  // it('should call addToCartHandler when add to cart button is clicked', () => {
  //   const spy = jest.spyOn(spectator.component, 'addToCartHandler');
  //   // Assuming you have a button with a test id or selector
  //   spectator.click('button[data-testid="add-to-cart"]');
  //   expect(spy).toHaveBeenCalled();
  // });
});