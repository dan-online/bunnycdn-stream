import type { VideoResponse } from '../types/response';

export class BunnyCdnStreamVideo {
  public videoLibraryId: number;
  public guid: string;
  public title: string;
  public dateUploaded: string;
  public views: number;
  public isPublic: boolean;
  public length: number;
  public status: number;
  public framerate: number;
  public width: number;
  public height: number;
  public availableResolutions: string;
  public thumbnailCount: number;
  public encodeProgress: number;
  public storageSize: number;
  public captions: {
    srclang: string;
    label: string;
  }[];

  public hasMP4Fallback: boolean;
  public collectionId: '';
  public thumbnailFileName: string;
  public averageWatchTime: number;
  public totalWatchTime: number;
  public category: string;
  public chapters: {
    title: string;
    start: number;
    end: number;
  }[];

  public moments: {
    label: string;
    timestamp: number;
  }[];

  public constructor(data: VideoResponse) {
    this.videoLibraryId = data.videoLibraryId;
    this.guid = data.guid;
    this.title = data.title;
    this.dateUploaded = data.dateUploaded;
    this.views = data.views;
    this.isPublic = data.isPublic;
    this.length = data.length;
    this.status = data.status;
    this.framerate = data.framerate;
    this.width = data.width;
    this.height = data.height;
    this.availableResolutions = data.availableResolutions;
    this.thumbnailCount = data.thumbnailCount;
    this.encodeProgress = data.encodeProgress;
    this.storageSize = data.storageSize;
    this.captions = data.captions;
    this.hasMP4Fallback = data.hasMP4Fallback;
    this.collectionId = data.collectionId;
    this.thumbnailFileName = data.thumbnailFileName;
    this.moments = data.moments;
    this.captions = data.captions;
    this.averageWatchTime = data.averageWatchTime;
    this.totalWatchTime = data.totalWatchTime;
    this.category = data.category;
    this.chapters = data.chapters;
  }

  public get resolutions() {
    return this.availableResolutions.split(',').map((x) => parseInt(x, 10));
  }
}
