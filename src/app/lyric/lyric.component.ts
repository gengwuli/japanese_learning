import { Component, OnInit } from '@angular/core';
import { Line } from '../line';
import { TextService, ASSETS_PATH } from '../text.service';

@Component({
  selector: 'app-lyric',
  templateUrl: './lyric.component.html',
  styleUrls: ['./lyric.component.css']
})
export class LyricComponent implements OnInit {
  active_lines: Array<Line> = [];
  songList: Array<string> = []
  song = ''
  current_line_index = 0
  asset_path = ASSETS_PATH
  constructor(public textService: TextService) {

  }

  ngOnInit(): void {

  }

  ngAfterContentInit() {
    const audio = document.getElementById("audio-1");
    audio?.addEventListener("timeupdate", () => this.synchronizeLyricLineWithSong(audio as HTMLMediaElement))
    audio?.addEventListener("play", () => this.reloadCurrentLineIndex(audio as HTMLMediaElement))
    audio?.addEventListener("playing", () => this.reloadCurrentLineIndex(audio as HTMLMediaElement))
    audio?.addEventListener("pause", () => console.log("pause"))
    audio?.addEventListener("waiting", () => console.log("waiting"))
    audio?.addEventListener("ended", () => console.log("ended"))
    document.getElementById("select-1")?.addEventListener("change", (e) => this.loadSong((e.target as HTMLSelectElement).value, audio as HTMLMediaElement))
    this.textService.GetSongList().subscribe((resp) => {
      if (resp instanceof Array) {
        let res: Array<string> = []
        for (let lesson of resp) {
          res.push(lesson);
        }
        res.sort((a, b) => a < b ? -1 : 1)
        for (let r of res) {
          this.songList.push(r);
        }
        if (this.songList.length > 0) {
          this.loadSong(this.songList[0], (audio as HTMLMediaElement));
        }
      }
    });
  }

  // Search the last line whose start is smaller than current play time
  BinarySearch(target: number) {
    let start = 0;
    let end = this.active_lines.length - 1;
    if (start > end) { return -1; }
    while (start < end) {
      const mid = Math.floor(start + (end - start) / 2);
      if (this.active_lines[mid].start >= target) {
        end = mid;
      } else {
        start = mid + 1;
      }
    }
    if (start == this.active_lines.length - 1 || start == 0) {
      return start;
    }
    if (this.active_lines[start].start <= target && this.active_lines[start + 1].start > target) {
      return start;
    }
    if (this.active_lines[start - 1].start <= target && this.active_lines[start].start > target) {
      return start - 1;
    }
    return -1;
  }

  reloadCurrentLineIndex(audio: HTMLMediaElement) {
    this.current_line_index = this.BinarySearch(audio.currentTime)
  }

  synchronizeLyricLineWithSong(audio: HTMLMediaElement) {
    if (this.current_line_index + 1 == this.active_lines.length) {
      return;
    }
    const time_now = audio.currentTime;
    let current_time_start = this.active_lines[this.current_line_index].start;
    let next_time_start = this.active_lines[this.current_line_index + 1].start;
    if (current_time_start < time_now && time_now >= next_time_start) {
      this.current_line_index++;
    }
  }

  isActive(index: number) {
    return this.current_line_index == index;
  }

  isGrey(index: number) {
    for (let i = this.current_line_index - 4; i < this.current_line_index + 5; i++) {
      if (i == this.current_line_index) { continue; }
      if (index == i) {
        return true;
      }
    }
    return false;
  }

  // Load the song and lyrics.
  loadSong(song: string, audio: HTMLMediaElement) {
    this.song = song;
    this.textService.LoadLyric(this.song, () => this.active_lines = this.textService.GetLyric(this.song)!)
    this.current_line_index = 0;
    audio.src = this.asset_path + this.song + '.ogg'
  }
}
