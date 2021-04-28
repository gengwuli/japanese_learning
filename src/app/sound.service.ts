import { Injectable } from '@angular/core';
import { LESSONS } from './app.constants';
import { ASSETS_PATH } from './text.service';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private context = new AudioContext;
  private buffers = new Map;
  private lessons = LESSONS;
  constructor() {
    this.context = new AudioContext();
    this.loadSounds();
  }

  loadSounds() {
    for (let lesson of this.lessons) {
      this.loadToBuffer(ASSETS_PATH+lesson+".mp3");
      this.loadToBuffer(ASSETS_PATH+lesson+"_voc.mp3");
    }
    this.loadToBuffer(ASSETS_PATH+"pre.mp3");
  }

  loadToBuffer(path: string) {
    var request = new XMLHttpRequest();
    request.open("GET", path, true);
    request.responseType = "arraybuffer";

    let context = this.context;
    let buffers = this.buffers;
    request.onload = () => {
      context.decodeAudioData(
        request.response,
        (buffer) => {
          if (!buffer) {
            alert('error decoding file data: ' + path);
            return;
          }
          buffers.set(path.split('/').pop()!.split('.')[0], buffer)
        },
        function (error) {
          console.error('decodeAudioData error', error);
        }
      );
    }
    request.send();
  }

  play(name: string, when?:number, duration?:number) {
    let source = this.context.createBufferSource();
    source.buffer = this.buffers.get(name);
    source.connect(this.context.destination);
    
    if (when && duration) {
      source.start(0, when, duration)
    } else {
      source.start(0)
    }
  }

  playWord(lesson: string, when?:number, duration?:number) {
    this.play(lesson+"_voc", when, duration);
  }

  playLine(lesson: string, when?:number, duration?:number) {
    this.play(lesson, when, duration);
  }
}
