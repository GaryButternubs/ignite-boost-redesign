import { Injectable } from '@angular/core';
import { Video, VideoSearch } from './Videos';
//import * as jsonData from './TestData.json';

@Injectable({
  providedIn: 'root'
})
export class VideoRequests {
  private delay = 1000; // Simulated network delay
  //private videos: Video[] = jsonData.videos;

  // Adjust methods to make HTTP requests once connected with backend
  async getAllVideos(): Promise<Video[]> {
    await this.simulateDelay();
    const videos = (await import('./TestData.json')).videos;
    return videos;
  }

  // Doesn't sort for now, since this is just for testing
  async searchVideos(query: VideoSearch): Promise<Video[]> {
    await this.simulateDelay();
    const videos: Video[] = (await import('./TestData.json')).videos;

    console.log(query);

    // TO-DO: Fix search functionality so that mirror matches work as intended
    return videos.filter(video => {
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
          // Check if it's a mirror first
          if (query.char2 && (query.char1 === query.char2)) {
            if (video.char1 !== video.char2) {
              return false;
            }
          }
          
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
        // Check if it's a mirror first
        if (query.assist2 && (query.assist1 === query.assist2)) {
          if (video.assist1 !== video.assist2) {
            return false;
          }
        }

        if (query.assist1 !== video.assist1 && query.assist1 !== video.assist2) {
          return false;
        }
      }

      if (query.assist2) {
        if (query.assist2 !== video.assist1 && query.assist2 !== video.assist2) {
          return false;
        }
      }

      if (query.version && (query.version !== video.version)) {
        return false;
      }

      return true;
    });
  }

  async addVideos(videos: Video[]): Promise<Object> {
    // TO-DO: Check input data, adding to videos JSON and return errors as needed
    //  - Missing parameters (400)
    //  - Failed to add video (500)
    
    // Videos added successfully
    return {
      status: 200
    }
  }

  private simulateDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.delay));
  }
}
