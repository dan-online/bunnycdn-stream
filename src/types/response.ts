export interface VideoResponse {
  videoLibraryId: number;
  guid: string;
  title: string;
  dateUploaded: string;
  views: number;
  isPublic: boolean;
  length: number;
  status: number;
  framerate: number;
  width: number;
  height: number;
  availableResolutions: string;
  thumbnailCount: number;
  encodeProgress: number;
  storageSize: number;
  captions: {
    srclang: string;
    label: string;
  }[];
  hasMP4Fallback: boolean;
  collectionId: '';
  thumbnailFileName: string;
  averageWatchTime: number;
  totalWatchTime: number;
  category: string;
  chapters: {
    title: string;
    start: number;
    end: number;
  }[];
  moments: {
    label: string;
    timestamp: number;
  }[];
}

export interface DeleteVideoResponse {
  success: boolean;
  message: string;
  statusCode: number;
}

export interface UploadVideoResponse {
  success: boolean;
  message: string;
  statusCode: number;
}

export interface AddCaptionsVideoResponse {
  success: boolean;
  message: string;
  statusCode: number;
}

export interface DeleteCaptionsVideoResponse {
  success: boolean;
  message: string;
  statusCode: number;
}

export interface FetchVideoResponse {
  success: boolean;
  message: string;
  statusCode: number;
}

export interface SetThumbnailVideoResponse {
  success: boolean;
  message: string;
  statusCode: number;
}

export interface VideoStatisticsResponse {
  viewsChart: { [date: string]: number };
  watchTimeChart: { [date: string]: number };
  countryViewCounts: { [country: string]: number };
  countryWatchTime: { [country: string]: number };
  engagementScore: number;
}

export interface ListVideosResponse {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  items: VideoResponse[];
}
