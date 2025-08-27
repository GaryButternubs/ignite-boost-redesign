import { Component, computed, inject, input } from '@angular/core';
import { NgOptimizedImage, NgClass } from '@angular/common';
import { CheckBreakpoints } from '../../../breakpoints/check-breakpoints';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Character, PlayableCharacters, AssistCharacters } from '../../../api/Characters';
import { Video } from '../../../api/Videos';

@Component({
  selector: 'app-replay-info',
  imports: [NgOptimizedImage, NgClass, MatButtonModule, MatIconModule],
  templateUrl: './replay-info.html',
  styleUrl: './replay-info.scss'
})
export class ReplayInfo {
  checkBreakpoints = inject(CheckBreakpoints);
  replay = input<Video>();
  isFull = computed<boolean>(() => this.checkBreakpoints.getIsFull());
  isIgnition = computed<boolean>(() => (this.replay()?.version ?? 2) === 2);

  // Computeds to get relevant Character/Assist data
  char1 = computed<Character>(() => PlayableCharacters.find((char) => {
    return (char.internal ?? char.short ?? char.name) === this.replay()!.char1;
  }) ?? PlayableCharacters[10]);

  assist1 = computed<Character>(() => AssistCharacters.find((assist) => {
    return (assist.internal ?? assist.short ?? assist.name) === this.replay()!.assist1;
  }) ?? AssistCharacters[0]);

  char2 = computed<Character>(() => PlayableCharacters.find((char) => {
    return (char.internal ?? char.short ?? char.name) === this.replay()!.char2;
  }) ?? PlayableCharacters[10]);

  assist2 = computed<Character>(() => AssistCharacters.find((assist) => {
    return (assist.internal ?? assist.short ?? assist.name) === this.replay()!.assist2;
  }) ?? AssistCharacters[0]);
}
