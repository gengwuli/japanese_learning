import { Injectable } from '@angular/core';

export const global_variable = []
@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private context = new AudioContext;
  private buffers = new Map;

  constructor() {
    this.context = new AudioContext();
    this.loadSounds();
  }

  loadSounds() {
    this.loadToBuffer("assets/lesson01.mp3");
    this.loadToBuffer("assets/voc1.mp3");
    this.loadToBuffer("assets/pre_3.ogg");
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
          buffers.set(path.split('/')[1].split('.')[0], buffer)
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
}
