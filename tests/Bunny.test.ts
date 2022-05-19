import { BunnyCdnStream } from '../src';

describe('BunnyCdnStream', () => {
  let stream: BunnyCdnStream;

  describe('is a class', () => {
    test('GIVEN typeof BunnyCdnStream THEN returns function', () => {
      expect(typeof BunnyCdnStream).toBe('function');
    });

    test('GIVEN typeof ...prototype THEN returns object', () => {
      expect(typeof BunnyCdnStream.prototype).toBe('object');
    });
  });

  jest.setTimeout(100000);
  describe('is a valid class', () => {
    stream = new BunnyCdnStream({ videoLibrary: process.env.BUNNY_VIDEO_LIBRARY || '123', apiKey: process.env.BUNNY_API_KEY || '123' });
    test('GIVEN instanceof BunnyCdnStream THEN returns true', () => {
      expect(stream instanceof BunnyCdnStream).toBe(true);
    });
  });
});
