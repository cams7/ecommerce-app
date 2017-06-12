import { ProductShortDescriptionPipe } from './product-short-description.pipe';

describe('ProductShortDescriptionPipe', () => {
  it('create an instance', () => {
    const pipe = new ProductShortDescriptionPipe();
    expect(pipe).toBeTruthy();
  });
});
