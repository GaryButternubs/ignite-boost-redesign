import { Video } from "../api/video-service/Videos";

export interface VideoData {
    url: string;
    id: string;
    date: string;
    src: number; // -1: N/A, 0: YouTube, 1: NicoNico, 2: BiliBili
    version: number; // 1: DFC, 2: DFCI
}

export interface MatchData {
    videoData: Video;
    index: number;
}

export const DefaultVideoData: VideoData = {
    url: '',
    id: '',
    date: '',
    src: -1,
    version: 2,
}