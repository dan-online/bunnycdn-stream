import { createReadStream, readFileSync } from 'fs';
import { resolve } from 'path';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { BunnyCdnStream, BunnyCdnStreamVideo } from '../src';
describe('BunnyCdnStream', () => {
  let stream: BunnyCdnStream;

  if (!process.env.IGNORE_PRUNE) {
    afterAll(async () => {
      await stream.deleteAllVideos();
    });
  }

  beforeAll(async () => {
    await stream.deleteAllVideos();
    await stream.deleteAllCollections();
  });

  describe('is a class', () => {
    test('GIVEN typeof BunnyCdnStream THEN returns function', () => {
      expect(typeof BunnyCdnStream).toBe('function');
    });

    test('GIVEN typeof ...prototype THEN returns object', () => {
      expect(typeof BunnyCdnStream.prototype).toBe('object');
    });
  });

  describe('is a valid class', () => {
    stream = new BunnyCdnStream({ videoLibrary: process.env.BUNNY_VIDEO_LIBRARY || '123', apiKey: process.env.BUNNY_API_KEY || '123' });
    test('GIVEN instanceof BunnyCdnStream THEN returns true', () => {
      expect(stream instanceof BunnyCdnStream).toBe(true);
    });
  });

  describe('can list videos', () => {
    test('GIVEN empty library THEN listVideos returns empty array', async () => {
      const videos = await stream.listVideos();
      expect(videos).toEqual({
        currentPage: 1,
        items: [],
        itemsPerPage: 100,
        totalItems: 0
      });
    });

    test('GIVEN empty library THEN listAllVideos returns empty array', async () => {
      const videos = await stream.listAllVideos();
      expect(videos).toEqual([]);
    });
  });

  describe('can manipulate videos', () => {
    let videoGuid: string;
    test(
      'GIVEN empty library THEN uploads video',
      async () => {
        const vid = createReadStream(resolve(__dirname, 'data', 'bunny.mp4'));
        const upload = await stream.createAndUploadVideo(vid, { title: 'test' });

        videoGuid = upload.guid;
        expect(upload).toMatchObject({
          guid: expect.any(String),
          title: 'test',
          averageWatchTime: 0,
          availableResolutions: null,
          captions: [],
          category: 'unknown',
          chapters: [],
          collectionId: '',
          dateUploaded: expect.any(String),
          encodeProgress: 0,
          framerate: 0,
          hasMP4Fallback: false,
          height: 0,
          isPublic: false,
          length: 0,
          metaTags: [],
          moments: [],
          status: 0,
          storageSize: 0,
          thumbnailCount: 0,
          thumbnailFileName: expect.any(String),
          totalWatchTime: 0,
          videoLibraryId: expect.any(Number),
          views: 0,
          width: 0
        });

        const videos = await stream.listVideos();
        expect(videos.items).toHaveLength(1);
      },
      { timeout: 60000 }
    );

    test('GIVEN library w/ video THEN can get video', async () => {
      const video = await stream.getVideo(videoGuid);
      expect(video.guid).toEqual(videoGuid);
    });

    test('GIVEN library w/ video THEN can list video', async () => {
      const videos = await stream.listVideos();
      expect(videos.items).toHaveLength(1);
    });

    test('GIVEN library w/ video AND has list params THEN empty', async () => {
      const videos = await stream.listVideos({ page: 2 });
      expect(videos.items).toHaveLength(0);
    });

    test(
      'GIVEN library w/ video THEN can encode',
      async () => {
        await new Promise((r) => {
          const interval = setInterval(async () => {
            const video = await stream.getVideo(videoGuid);
            if (video.encodeProgress === 100) {
              clearInterval(interval);
              r(0);
            }
          }, 1000);
        });
      },
      { timeout: 60000 * 2 }
    );

    test('GIVEN library w/ encoded video THEN has meta', async () => {
      const video = await stream.getVideo(videoGuid);
      expect(video).toMatchObject({
        videoLibraryId: expect.any(Number),
        guid: videoGuid,
        title: 'test',
        dateUploaded: expect.any(String),
        views: 0,
        isPublic: false,
        length: 5,
        status: 4,
        framerate: expect.any(Number),
        width: 608,
        height: 1080,
        availableResolutions: expect.any(String),
        thumbnailCount: expect.any(Number),
        encodeProgress: 100,
        storageSize: expect.any(Number),
        captions: [],
        hasMP4Fallback: true,
        collectionId: '',
        thumbnailFileName: expect.any(String),
        moments: [],
        averageWatchTime: 0,
        totalWatchTime: 0,
        category: 'animals-cats',
        chapters: [],
        metaTags: []
      });

      expect(video.resolutions).toHaveLength(4);
    });

    test('GIVEN library w/ encoded video THEN can upload vtt subtitles', async () => {
      const subs = readFileSync(resolve(__dirname, 'data', 'bunny.vtt'));
      const res = await stream.addCaptions(videoGuid, { captionsFile: subs, label: 'English', srclang: 'en' });
      expect(res).toMatchObject({
        success: true,
        message: 'OK',
        statusCode: 200
      });
    });

    test('GIVEN library w/ encoded video THEN can upload srt subtitles', async () => {
      const subs = readFileSync(resolve(__dirname, 'data', 'bunny.srt'));
      const res = await stream.addCaptions(videoGuid, { captionsFile: subs, label: 'Spanish', srclang: 'es' });
      expect(res).toMatchObject({
        success: true,
        message: 'OK',
        statusCode: 200
      });
    });

    test('GIVEN library w/ encoded video THEN can delete subtitles', async () => {
      const res = await stream.deleteCaptions(videoGuid, 'en');
      expect(res).toMatchObject({
        success: true,
        message: 'OK',
        statusCode: 200
      });
    });

    test('GIVEN library w/ encoded video THEN can get stats', async () => {
      const res = await stream.getVideoStatistics(videoGuid);
      expect(res).toMatchObject({
        viewsChart: expect.any(Object),
        watchTimeChart: expect.any(Object),
        countryViewCounts: expect.any(Object),
        countryWatchTime: expect.any(Object),
        engagementScore: expect.any(Number)
      });
    });

    test('GIVEN library w/ encoded video THEN can update', async () => {
      await stream.updateVideo(videoGuid, { title: 'updated' });
      const vid = await stream.getVideo(videoGuid);
      expect(vid.title).toEqual('updated');
    });

    test('GIVEN library w/ encoded video THEN can set thumbnail as png', async () => {
      const thumbnail = readFileSync(resolve(__dirname, 'data', 'bunny.png'));
      const res = await stream.setThumbnail(videoGuid, thumbnail);
      expect(res).toEqual({ success: true, message: 'OK', statusCode: 200 });
    });

    test('GIVEN library w/ encoded video THEN can set thumbnail as jpg', async () => {
      const thumbnail = readFileSync(resolve(__dirname, 'data', 'bunny.jpg'));
      const res = await stream.setThumbnail(videoGuid, thumbnail);
      expect(res).toEqual({ success: true, message: 'OK', statusCode: 200 });
    });

    test('GIVEN library w/ encoded video AND overriden mime THEN can set thumbnail as jpg', async () => {
      const thumbnail = readFileSync(resolve(__dirname, 'data', 'bunny.jpg'));
      const res = await stream.setThumbnail(videoGuid, thumbnail, 'image/jpg');
      expect(res).toEqual({ success: true, message: 'OK', statusCode: 200 });
    });

    test('GIVEN library w/ encoded video THEN can set thumbnail from stream', async () => {
      const thumbnail = createReadStream(resolve(__dirname, 'data', 'bunny.jpg'));
      const res = await stream.setThumbnail(videoGuid, thumbnail);
      expect(res).toEqual({ success: true, message: 'OK', statusCode: 200 });
    });

    test('GIVEN library w/ encoded video THEN can set thumbnail from url', async () => {
      const res = await stream.setThumbnail(videoGuid, 'https://bunny.net/images/floatplane.png');
      expect(res).toEqual({ success: true, message: 'OK', statusCode: 200 });
    });

    // test('GIVEN library w/ encoded video THEN can get heatmap', async () => {
    //   const res = await stream.getVideoHeatmap(videoGuid);
    //   console.log(res);
    // }); // 500

    test('GIVEN library w/ encoded video THEN can fetch', async () => {
      const res = await stream.fetchVideo(videoGuid, { url: 'https://support-bunny.b-cdn.net/tickets/186949/file_example_MP4_480_1_5MG.mp4' });
      expect(res).toMatchObject({
        id: expect.any(String),
        success: true,
        message: 'OK',
        statusCode: 200
      });

      await new Promise((r) => {
        const interval = setInterval(async () => {
          const video = await stream.getVideo(videoGuid);
          if (video.encodeProgress === 100) {
            clearInterval(interval);
            r(0);
          }
        }, 1000);
      });
    });

    test(
      'GIVEN library w/ encoded video THEN can reencode',
      async () => {
        const res = await stream.reencodeVideo(videoGuid);
        expect(res).toBeInstanceOf(BunnyCdnStreamVideo);
        await new Promise((r) => {
          const interval = setInterval(async () => {
            const video = await stream.getVideo(videoGuid);
            if (video.encodeProgress === 100) {
              clearInterval(interval);
              r(0);
            }
          }, 1000);
        });
      },
      { timeout: 60000 * 2 }
    );

    test('GIVEN library THEN upload invalid video', async () => {
      const vid = createReadStream(resolve(__dirname, 'data', 'bunny.mp4'));
      await expect(stream.createAndUploadVideo(vid, { title: 'test', collectionId: 'invalidCollections' })).rejects.toThrow();
    });
  });

  describe('can use tus', () => {
    test('GIVEN library THEN generate TUS', async () => {
      const tus = await stream.createDirectUpload({ title: 'test-tus' });
      expect(tus).toMatchObject({
        video: expect.anything(),
        endpoint: expect.any(String),
        headers: expect.any(Object),
        metadata: expect.any(Object)
      });

      expect(tus.video).toBeInstanceOf(BunnyCdnStreamVideo);
      await stream.deleteVideo(tus.video.guid);
    });
  });

  describe('can use collections', () => {
    let createdCollectionGUID: string;

    test('GIVEN library w/ a non-existing collection Id THEN throws an error', async () => {
      await expect(stream.getCollection('non-existing-GUID')).rejects.toThrowError();
    });

    test('GIVEN library w/ a collection name THEN can create collection', async () => {
      const response = await stream.createCollection('TestCollection');
      expect(response).toMatchObject({
        videoLibraryId: expect.any(Number),
        guid: expect.any(String),
        name: expect.any(String),
        videoCount: expect.any(Number),
        totalSize: expect.any(Number),
        previewVideoIds: expect.any(Object)
      });

      createdCollectionGUID = response.guid; // Sets the GUID for the following tests
    });

    test('GIVEN library w/ a collection Id THEN can fetch a collection', async () => {
      const response = await stream.getCollection(createdCollectionGUID);
      expect(response).toMatchObject({
        videoLibraryId: expect.any(Number),
        guid: expect.any(String),
        name: expect.any(String),
        videoCount: expect.any(Number),
        totalSize: expect.any(Number),
        previewVideoIds: expect.any(Object)
      });
    });

    test('GIVEN library THEN can list collections', async () => {
      const response = await stream.listCollections();
      expect(response).toMatchObject({
        totalItems: expect.any(Number),
        itemsPerPage: expect.any(Number),
        currentPage: expect.any(Number),
        items: expect.any(Object)
      });
    });

    test('GIVEN library w/ values for list parameters THEN can list collections', async () => {
      const response = await stream.listCollections({ search: 'TestCollection', itemsPerPage: 10, page: 1, orderBy: 'date' });
      const createdCollection = response.items.find((item) => item.guid === createdCollectionGUID);
      expect(createdCollection?.name).toBe('TestCollection');
    });

    test('GIVEN library THEN can list all collections', async () => {
      const response = await stream.listAllCollections();

      expect(response[0]).toMatchObject({
        videoLibraryId: expect.any(Number),
        guid: expect.any(String),
        name: expect.any(String),
        videoCount: expect.any(Number),
        totalSize: expect.any(Number),
        previewVideoIds: expect.any(Object)
      });
    });

    test('GIVEN library w/ a collection Id THEN can update a collection', async () => {
      const response = await stream.updateCollection(createdCollectionGUID, { name: 'NewCollectionName' });
      expect(response).toMatchObject({
        success: true,
        message: 'OK',
        statusCode: 200
      });
    });

    test('GIVEN library w/ a collection Id THEN can delete a collection', async () => {
      const response = await stream.deleteCollection(createdCollectionGUID);
      expect(response).toMatchObject({
        success: true,
        message: 'OK',
        statusCode: 200
      });
    });
  });
});
