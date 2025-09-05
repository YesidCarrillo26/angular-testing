import { Spectator, mockProvider, createRoutingFactory } from "@ngneat/spectator/jest";
import ProductDetailComponent from "./product-detail.component";
import { ProductService } from "@shared/services/product.service";
import { byTestId, SpyObject } from "@ngneat/spectator";
import { of } from "rxjs";
import { DeferBlockBehavior } from "@angular/core/testing";
import { RelatedComponent } from "@products/components/related/related.component";
import { CartService } from "@shared/services/cart.service";
import { MetaTagsService } from "@shared/services/meta-tags.service";

window.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  takeRecords: jest.fn(),
  root: null,
  rootMargin: '',
  thresholds: [],
}));

describe("ProductDetailComponent", () => {
  let spectator: Spectator<ProductDetailComponent>;
  let productService: SpyObject<ProductService>;
  const mockProduct = {
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

  const createComponent = createRoutingFactory({
    component: ProductDetailComponent,
    deferBlockBehavior: DeferBlockBehavior.Manual,
    providers: [
      mockProvider(ProductService, {
        getOneBySlug: jest.fn().mockReturnValue(of(mockProduct))
      }),
      mockProvider(CartService, {
        addToCart: jest.fn()
      }),
      mockProvider(MetaTagsService, {
        updateMetaTags: jest.fn()
      })
    ]
  });

  beforeEach(() => {
    spectator = createComponent({
      detectChanges: false
    });
    spectator.setInput('slug', mockProduct.slug);
    productService = spectator.inject(ProductService);
  });


  it("should create", () => {
    spectator.detectChanges();
    expect(spectator.component).toBeTruthy();
  });

  it("should getOneBySlug be called", () => {
    spectator.detectChanges();
    expect(productService.getOneBySlug).toHaveBeenCalledWith(mockProduct.slug);
  });

  it("should display product cover image", () => {
    
    // Act
    spectator.detectChanges();

    // Assert
    const cover = spectator.query<HTMLImageElement>(byTestId('cover'))
    expect(cover).toBeTruthy();
    expect(cover?.src).toContain(mockProduct.images[0]);
  });

  it("should load related products component", async () => {
    spectator.detectChanges();
    await spectator.deferBlock().renderComplete();
    const related = spectator.query(RelatedComponent);
    expect(related).toBeTruthy();
  })

  it("should display product gallery", () => {
    spectator.detectChanges();
    const gallery = spectator.query(byTestId('gallery'));
    const images = gallery?.querySelectorAll('img') || [];
    expect(images.length).toBe(mockProduct.images.length);

    spectator.click(images[1]);
    spectator.detectChanges();
  })

});

