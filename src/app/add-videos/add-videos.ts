import { Component, OnDestroy, signal } from '@angular/core';
import { VideoPreview } from "./video-preview/video-preview";
import { MatchInfo } from './match-info/match-info';
import { Video, DefaultVideo } from '../api/video-service/Videos';
import { VideoData, DefaultVideoData, MatchData } from './VideoData';

@Component({
  selector: 'app-add-videos',
  imports: [VideoPreview, MatchInfo],
  templateUrl: './add-videos.html',
  styleUrl: './add-videos.scss'
})
export class AddVideos implements OnDestroy {
  matchList = signal<Video[]>([DefaultVideo]);
  videoData = signal<VideoData>(DefaultVideoData);

  updateVideoData(newData: VideoData) {
    this.videoData.set(newData);
  }

  updateMatchList(data: MatchData) {
    const {videoData, index} = data;
    
    this.matchList.update(matches => {
      matches[index] = videoData;
      return matches;
    });
  }

  // Reset back to DFCI theme on page change
  ngOnDestroy(): void {
    document.body.classList.remove('dfc-theme');
    document.body.classList.add('dfci-theme');
  }
}
