import { Component, OnDestroy, signal } from '@angular/core';
import { VideoPreview } from "./video-preview/video-preview";
import { Video } from '../api/video-service/Videos';
import { VideoData, DefaultVideoData } from './VideoData';

@Component({
  selector: 'app-add-videos',
  imports: [VideoPreview],
  templateUrl: './add-videos.html',
  styleUrl: './add-videos.scss'
})
export class AddVideos implements OnDestroy {
  matchList = signal<Video[]>([]);
  videoData = signal<VideoData>(DefaultVideoData);

  updateVideoData(newData: VideoData) {
    this.videoData.set(newData);
  }

  // Reset back to DFCI theme on page change
  ngOnDestroy(): void {
    document.body.classList.remove('dfc-theme');
    document.body.classList.add('dfci-theme');
  }
}
