import { HeaderComponent } from './header.component';
import { createRoutingFactory, SpectatorRouting } from '@ngneat/spectator/jest';
import { CartService } from '@shared/services/cart.service';

describe('HeaderComponent', () => {
  let spectator: SpectatorRouting<HeaderComponent>;

  const createComponent = createRoutingFactory({
    component: HeaderComponent,
    providers: [CartService],
  });

  beforeEach(() => {
    spectator = createComponent();
  }
  );

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
  
  // Add more tests as needed
  it('should toggle side menu', () => {
    const initialState = spectator.component.hideSideMenu();
    spectator.component.toogleSideMenu();
    expect(spectator.component.hideSideMenu()).toBe(!initialState);
  });

  it('should toggle menu', () => {
    const initialState = spectator.component.showMenu();
    spectator.component.toggleMenu();
    expect(spectator.component.showMenu()).toBe(!initialState);
  });


});