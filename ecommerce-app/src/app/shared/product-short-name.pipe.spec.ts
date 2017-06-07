import { ProductShortNamePipe } from './product-short-name.pipe';

describe('ProductShortNamePipe', () => {
  it('create an instance', () => {
    const pipe = new ProductShortNamePipe();
    expect(pipe).toBeTruthy();
  });
});
