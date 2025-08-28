import { SpectatorPipe, createPipeFactory } from '@ngneat/spectator/jest';

import { ReversePipe } from './reverse.pipe';

describe('ReversePipe', () => {
  let spectator: SpectatorPipe<ReversePipe>;
  const createPipe = createPipeFactory(ReversePipe);

  it('should reverse the string', () => {
    spectator = createPipe(`{{ 'hello' | reverse }}`);
    expect(spectator.element).toHaveText('olleh');
  });

  //edge cases
  it('should handle empty string', () => {
    spectator = createPipe(`{{ '' | reverse }}`);
    expect(spectator.element).toHaveText('');
  });

  it('should handle single character', () => {
    spectator = createPipe(`{{ 'a' | reverse }}`);
    expect(spectator.element).toHaveText('a');
  });

  it('should handle palindrome', () => {
    spectator = createPipe(`{{ 'madam' | reverse }}`);
    expect(spectator.element).toHaveText('madam');
  });
});