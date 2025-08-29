import { Component, signal } from '@angular/core';
import { Video } from '../api/video-service/Videos';
import { VideoPreview } from "./video-preview/video-preview";

@Component({
  selector: 'app-add-videos',
  imports: [VideoPreview],
  templateUrl: './add-videos.html',
  styleUrl: './add-videos.scss'
})
export class AddVideos {
  videoDate = signal<string>('');
  videoLink = signal<string>('');
  matchList = signal<Video[]>([]);
}
