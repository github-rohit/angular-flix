import { EncodeUriStringPipe } from './encode-uri-string.pipe';

describe('EncodeUriStringPipe', () => {
  it('create an instance', () => {
    const pipe = new EncodeUriStringPipe();
    expect(pipe).toBeTruthy();
  });
});
