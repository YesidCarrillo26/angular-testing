import { Spectator, byTestId, createComponentFactory } from '@ngneat/spectator/jest';
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
      detectChanges: false,
    });
    spectator.setInput('product', mockProduct);
  });

  it('should create', () => {
    spectator.detectChanges();
    expect(spectator.component).toBeTruthy();
  });

  // display title
  // it('should display product title', () => {
  //   spectator.detectChanges();
  //   expect(spectator.query('h3')).toHaveText(mockProduct.title);
  // });
  
  //title test id
  it('should display product title using test id', () => {
    spectator.detectChanges();
    const titleElement = spectator.query(byTestId('product-title'));
    expect(titleElement).toHaveText(mockProduct.title);
  });

  // product price 
  it('should emit a product when the button is clicked', () => {
    spectator.detectChanges();
    // Arrange
    const emitSpy = jest.spyOn(spectator.component.addToCart, 'emit');
    // Act
    spectator.detectChanges();
    spectator.click(byTestId('add-to-cart-button'));
    // Assert
    expect(emitSpy).toHaveBeenCalledWith(mockProduct);
  });

  
  
});