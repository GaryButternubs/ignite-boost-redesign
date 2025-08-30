import { Component, computed, inject, input, output, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckBreakpoints } from '../../breakpoints/check-breakpoints';
import { CharDropdown } from '../../components/char-dropdown/char-dropdown';
import { Character, PlayableCharacters, AssistCharacters } from '../../api/video-service/Characters';
import { Video } from '../../api/video-service/Videos';
import { DefaultVideoData, VideoData, MatchData } from '../VideoData';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-match-info',
  imports: [
    NgClass,
    FormsModule, 
    CharDropdown, 
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './match-info.html',
  styleUrl: './match-info.scss'
})
export class MatchInfo {
  checkBreakpoints = inject(CheckBreakpoints);

  index = input.required<number>();
  videoData = input<VideoData>(DefaultVideoData);

  time = signal<string>(''); // Assemble URL with timestamp on form submission
  player1 = signal<string>('');
  char1 = signal<Character>(PlayableCharacters[10]);
  assist1 = signal<Character>(AssistCharacters[0]);
  player2 = signal<string>('');
  char2 = signal<Character>(PlayableCharacters[10]);
  assist2 = signal<Character>(AssistCharacters[0]);

  validTime = signal<boolean>(false);

  isFull = computed<boolean>(() => this.checkBreakpoints.getIsFull());

  matchInfo = computed<Video>(() => {
    const videoData: Video = {
      matchDate: this.videoData().date,
      player1: this.player1(),
      char1: this.char1().internal ?? this.char1().short ?? this.char1().name,
      assist1: this.assist1().internal ?? this.assist1().short ?? this.assist1().name,
      player2: this.player2(),
      char2: this.char2().internal ?? this.char2().short ?? this.char2().name,
      assist2: this.assist2().internal ?? this.assist2().short ?? this.assist2().name,
      link: this.videoData().url,
      version: this.videoData().version
    }

    return videoData;
  });

  // Disable submission unless every field is filled out
  validSubmission = computed<boolean>(() => {
    if (!this.validTime()) return false;

    const keys = Object.keys(this.matchInfo());

    for (let i = 0; i < keys.length; i++) {
      if (!this.matchInfo()[keys[i] as keyof Video]) return false;
    }

    this.updateMatchArray.emit({videoData: this.matchInfo(), index: this.index()});
    return true;
  });

  updateMatchArray = output<MatchData>();
  deleteMatchEntry = output<number>();

  playableCharacters = PlayableCharacters;
  assistCharacters = AssistCharacters;

  parseTimeInput(newTime: string) {
    // Remove any invalid characters from time
    let parsedTime = '00:00:00';
    let replacedTime = newTime.replace(/[^\d:]/, '');

    if (replacedTime) {
      let splitTime = replacedTime.split(':');
      
      if (splitTime.length > 3) splitTime = splitTime.slice(0, 2);
      while (splitTime.length < 3) splitTime.push('00');

      for (let i = 0; i < splitTime.length; i++) {
        while (splitTime[i].length < 2) {
          splitTime[i] = `0${splitTime[i]}`;
        }
      }

      parsedTime = splitTime.join(':');
    }

    this.time.set(parsedTime);
  }
}
