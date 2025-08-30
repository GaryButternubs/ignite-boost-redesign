import { Component, OnDestroy, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { VideoPreview } from "./video-preview/video-preview";
import { MatchInfo } from './match-info/match-info';
import { Video, ReplayInfo } from '../api/video-service/Videos';
import { VideoData, DefaultVideoData, MatchItem } from './VideoData';

@Component({
  selector: 'app-add-videos',
  imports: [NgClass, VideoPreview, MatchInfo],
  templateUrl: './add-videos.html',
  styleUrl: './add-videos.scss'
})
export class AddVideos implements OnDestroy {
  matchList = signal<MatchItem[]>([{
    data: {
      player1: '',
      char1: '',
      assist1: '',
      player2: '',
      char2: '',
      assist2: '',
      timestamp: '',
    },
    index: 0,
    valid: false,
  }]);
  videoData = signal<VideoData>(DefaultVideoData);
  matchesValid = signal<boolean>(false);

  buttonOptions = ['Add Match', 'Submit Match', 'Submit Matches'];

  updateVideoData(newData: VideoData) {
    this.videoData.set(newData);
  }

  updateMatchList(item: MatchItem) {
    const {data, index, valid} = item;
    
    this.matchList.update(matches => {
      matches[index].data = data;
      matches[index].index = index;
      matches[index].valid = valid;

      return matches;
    });

    this.matchesValid.set(this.areMatchesValid());
  }

  deleteMatchEntry(deletionIndex: number) {
    const temp = this.matchList().filter((match, index) => index !== deletionIndex);
    this.matchList.set(temp);

    this.matchesValid.set(this.areMatchesValid());
  }

  // Check if all match data is currently valid for submission
  areMatchesValid(): boolean {
    for (let i = 0; i < this.matchList().length; i++) {
      if (!this.matchList()[i].valid) {
        return false;
      }
    }

    return true;
  }

  addMatch() {
    const temp = this.matchList();
    temp.push({
      data: {
        player1: '',
        char1: '',
        assist1: '',
        player2: '',
        char2: '',
        assist2: '',
        timestamp: '',
      },
      index: 0,
      valid: false,
    });

    this.matchList.set(temp);
  }

  // Parse match data as a whole and make a request to API to add videos
  submitMatches() {

  }

  // Reset back to DFCI theme on page change
  ngOnDestroy(): void {
    document.body.classList.remove('dfc-theme');
    document.body.classList.add('dfci-theme');
  }
}
