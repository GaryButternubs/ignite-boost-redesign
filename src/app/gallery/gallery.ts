import { Component, computed, inject, resource, signal } from '@angular/core';
import { VsScreen } from "./vs-screen/vs-screen";
import { ReplayList } from "./replay-list/replay-list";
import { Video, VideoSearch } from '../api/Videos';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiRequests } from '../api/api-requests';

@Component({
  selector: 'app-gallery',
  imports: [VsScreen, ReplayList, MatProgressSpinnerModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss'
})
export class Gallery {
  apiRequestService = inject(ApiRequests);

  // What we need inside Gallery
  // - Query signal that adjusts based on output from vs-screen
  //  - Feed said query into replay-list for searching
  query = signal<VideoSearch>({
    player1: '',
    player2: '',
    char1: '',
    char2: '',
    assist1: '',
    assist2: '',
    version: 2,
    sort: '',
  });

  isEmpty = computed<boolean>(() => {
    let empty = true;

    Object.keys(this.query()).forEach(key => {
      const newKey: keyof VideoSearch = key as keyof VideoSearch;
      if (key !== 'version' && this.query()[newKey]) empty = false;
    });

    return empty;
  });

  videosResource = resource({
    params: () => this.query(),
    loader: ({params}) => {
      if (this.isEmpty()) return this.apiRequestService.getAllVideos();

      return this.apiRequestService.searchVideos(params);
    }
  });

  // Using any is sloppy, and I should find a nicer way of doing it if I can
  updateQueryParam({key, value}: {key: keyof VideoSearch, value: any}) {
    // .update() isn't notifying dependancies, so need to make deep copy of query
    const newQuery: VideoSearch = {...this.query()};
    newQuery[key] = value;
    this.query.set(newQuery);
  }
}
