import { Injectable } from '@angular/core';
import { Video, VideoSearch } from './Videos';
import * as jsonData from './TestData.json';

@Injectable({
  providedIn: 'root'
})
export class ApiRequests {
  private delay = 1000; // Simulated network delay
  private videos: Video[] = jsonData.videos;

  // Adjust methods to make HTTP requests once connected with backend
  async getAllVideos(): Promise<Video[]> {
    await this.simulateDelay();
    return this.videos;
  }

  // Doesn't sort for now, since this is just for testing
  async searchVideos(query: VideoSearch): Promise<Video[]> {
    await this.simulateDelay();

    console.log(query);

    return this.videos.filter(video => {
      if (query.player1) {
        if (query.player1 !== video.player1 && query.player1 !== video.player2) {
          return false;
        } else {
          if (query.char1 && 
            ((query.player1 !== video.player1 || query.char1 !== video.char1) && 
            (query.player1 !== video.player2 || query.char1 !== video.char2))
          ) {
            return false;
          }

          if (query.assist1 && 
            ((query.player1 !== video.player1 || query.assist1 !== video.assist1) && 
            (query.player1 !== video.player2 || query.assist1 !== video.assist2))
          ) {
            return false;
          }
        }
      }

      if (query.player2) {
        if (query.player2 !== video.player1 && query.player2 !== video.player2) {
          return false;
        } else {
          if (query.char1 && 
            ((query.player2 !== video.player1 || query.char1 !== video.char1) && 
            (query.player2 !== video.player2 || query.char1 !== video.char2))
          ) {
            return false;
          }

          if (query.assist1 && 
            ((query.player2 !== video.player1 || query.assist1 !== video.assist1) && 
            (query.player2 !== video.player2 || query.assist1 !== video.assist2))
          ) {
            return false;
          }
        }
      }

      if (query.char1) {
        if (query.char1 !== video.char1 && query.char1 !== video.char2) {
          return false;
        } else {
          if (query.assist1 && 
            ((query.char1 !== video.char1 || query.assist1 !== video.assist1) && 
            (query.char1 !== video.char2 || query.assist1 !== video.assist2))
          ) {
            return false;
          }
        }
      }

      if (query.char2) {
        if (query.char2 !== video.char2 && query.char2 !== video.char2) {
          return false;
        } else {
          if (query.assist2 && 
            ((query.char2 !== video.char1 || query.assist2 !== video.assist1) && 
            (query.char2 !== video.char2 || query.assist2 !== video.assist2))
          ) {
            return false;
          }
        }
      }

      if (query.assist1) {
        if (query.assist1 !== video.assist1 && query.assist1 !== video.assist2) {
          return false;
        }
      }

      if (query.assist2) {
        if (query.assist2 !== video.assist1 && query.assist2 !== video.assist2) {
          return false;
        }
      }

      if (query.version && query.version !== video.version) {
        return false;
      }

      return true;
    });
  }

  private simulateDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.delay));
  }
}
