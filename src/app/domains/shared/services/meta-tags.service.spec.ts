import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { MetaTagsService } from './meta-tags.service';
import { Meta, Title } from '@angular/platform-browser';

describe('MetaTagsService', () => {
  let spectator: SpectatorService<MetaTagsService>;
  let metaService: Meta;
  let titleService: Title;
  const createService = createServiceFactory({
    service: MetaTagsService,
    providers: [
      {
        provide: Title,
        useValue: {
          setTitle: jest.fn(),
        }
      },
      {
        provide: Meta,
        useValue: {
          updateTag: jest.fn()
        }
      }
    ]
  });

  beforeEach(() => {
    spectator = createService()
    metaService = spectator.inject(Meta);
    titleService =  spectator.inject(Title);

    // Reinicia los mocks antes de cada test
    jest.clearAllMocks();
  });

  it('should create the service', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should update meta tags with default values', () => {
    spectator.service.updateMetaTags({
      title: 'New Title',
      description: 'New Description',
      image: 'image.png',
      url: 'http://new-url.com'
    });

    expect(metaService.updateTag).toHaveBeenCalledTimes(6);
  })

  // More tests can be added here to cover different scenarios
  it('should update meta tags with partial values', () => {
    spectator.service.updateMetaTags({
      title: 'Partial Title'
    });
    expect(metaService.updateTag).toHaveBeenCalledTimes(6);
    expect(titleService.setTitle).toHaveBeenCalledWith('Partial Title');
  }
  );

  it('should update meta tags with empty values', () => {
    spectator.service.updateMetaTags({});
    expect(metaService.updateTag).toHaveBeenCalledTimes(6);
    expect(titleService.setTitle).toHaveBeenCalledWith('Ng Store');
  });


})