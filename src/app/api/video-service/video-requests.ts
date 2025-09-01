import { Injectable } from '@angular/core';
import { Video, VideoSearch, ReplayInfo } from './Videos';
import { VideoData } from '../../add-videos/VideoData';
import { Response } from '../Response';
//import * as jsonData from './TestData.json';

@Injectable({
  providedIn: 'root'
})
export class VideoRequests {
  private delay = 200; // Simulated network delay
  private videos: Video[] = [];

  // Adjust methods to make HTTP requests once connected with backend
  async getAllVideos(): Promise<Video[]> {
    await this.simulateDelay();
    
    if (this.videos.length === 0) {
      this.videos = (await import('./TestData.json')).videos;
    }

    return this.videos;
  }

  // Doesn't sort for now, since this is just for testing
  async searchVideos(query: VideoSearch): Promise<Video[]> {
    await this.simulateDelay();

    const { char1, char2, assist1, assist2, version } = query;
    const player1 = (query.player1) ? query.player1.toLowerCase() : '';
    const player2 = (query.player2) ? query.player2.toLowerCase() : '';

    // TO-DO: Fix search functionality so that mirror matches work as intended
    return this.videos.filter(video => {
      if (player1) {
        if (video.player1.toLowerCase().indexOf(player1) === -1 && video.player2.toLowerCase().indexOf(player1) === -1) {
          return false;
        } else {
          if (query.char1 && 
            ((video.player1.toLowerCase().indexOf(player1) === -1 || query.char1 !== video.char1) && 
            (video.player2.toLowerCase().indexOf(player1) === -1 || query.char1 !== video.char2))
          ) {
            return false;
          }

          if (query.assist1 && 
            ((video.player1.toLowerCase().indexOf(player1) === -1 || query.assist1 !== video.assist1) && 
            (video.player2.toLowerCase().indexOf(player1) === -1 || query.assist1 !== video.assist2))
          ) {
            return false;
          }
        }
      }

      if (player2) {
        if (video.player1.toLowerCase().indexOf(player2) === -1 && video.player2.toLowerCase().indexOf(player2) === -1) {
          return false;
        } else {
          if (query.char1 && 
            ((video.player1.toLowerCase().indexOf(player2) === -1 || query.char1 !== video.char1) && 
            (video.player2.toLowerCase().indexOf(player2) === -1 || query.char1 !== video.char2))
          ) {
            return false;
          }

          if (query.assist1 && 
            ((video.player1.toLowerCase().indexOf(player2) === -1 || query.assist1 !== video.assist1) && 
            (video.player2.toLowerCase().indexOf(player2) === -1 || query.assist1 !== video.assist2))
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

  async addVideos(videoData: VideoData, replays: ReplayInfo[]): Promise<Response> {
    await this.simulateDelay();
    
    let incompleteURL = '';

    // Set up URL, barring timestamp
    switch (videoData.src) {
      // YouTube
      case 0:
        incompleteURL += `https://youtu.be/${videoData.id}?t=`;
        break;
      
      // Niconico
      case 1:
        incompleteURL += `https://www.nicovideo.jp/watch/${videoData.id}?from=`;
        break;

      // Bilibili
      case 2:
        incompleteURL += `https://www.bilibili.com/video/${videoData.id}/?t=`;
        break;

      // Twitch
      case 3:
        incompleteURL += `https://www.twitch.tv/videos/${videoData.id}/?t=`;
    }
    
    // Format URL based on video source
    const newVideos = replays.map(replay => {
      // Start by generating date object to calculate elapsed seconds
      const hours = parseInt(replay.timestamp.substring(0, 2));  // Hours
      const minutes = parseInt(replay.timestamp.substring(3, 5));       // Minutes
      const seconds = parseInt(replay.timestamp.substring(6));               // Seconds

      let completeURL;

      // Twitch does it differently from everyone else
      if (videoData.src !== 3) completeURL = `${incompleteURL}${(hours * 3600) + (minutes * 60) + seconds}`;
      else completeURL = `${incompleteURL}${hours}h${minutes}m${seconds}s`;

      const newVideo: Video = {
        matchDate: videoData.date,
        player1: replay.player1,
        char1: replay.char1,
        assist1: replay.assist1,
        player2: replay.player2,
        char2: replay.char2,
        assist2: replay.assist2,
        link: completeURL,
        version: videoData.version,
      };

      return newVideo;
    });

    try {
      newVideos.forEach(newVideo => {
        this.videos = [newVideo, ...this.videos];
      });

      return {
        status: 200,
        message: 'Videos have successfully been added!'
      };
    } catch (err) {
      return {
        status: 500,
        message: 'Something went wrong while adding videos. Please try again later.'
      };
    }
  }

  private simulateDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.delay));
  }
}
