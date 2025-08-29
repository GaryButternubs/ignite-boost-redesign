import { Component, OnDestroy, signal } from '@angular/core';
import { Video } from '../api/video-service/Videos';
import { VideoPreview } from "./video-preview/video-preview";

@Component({
  selector: 'app-add-videos',
  imports: [VideoPreview],
  templateUrl: './add-videos.html',
  styleUrl: './add-videos.scss'
})
export class AddVideos implements OnDestroy {
  videoDate = signal<string>('');
  videoLink = signal<string>('');
  matchList = signal<Video[]>([]);

  // Reset back to DFCI theme on page change
  ngOnDestroy(): void {
    document.body.classList.remove('dfc-theme');
    document.body.classList.add('dfci-theme');
  }
}
