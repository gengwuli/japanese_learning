import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Line } from './line';
import { Word } from './word';

const LINE_BREAK = '\n'
const ITEM_BREAK = '|'
const SUB_ITEM_BREAK = ','
// Local path is 'assets/', have to put all under assets
export const ASSETS_PATH = 'https://gengwu.herokuapp.com/'
// export const ASSETS_PATH = 'http://localhost:3000/'

@Injectable({
  providedIn: 'root'
})
export class TextService {
  zhuyin:Map<string, string> = new Map<string, string>();
  words = new Map<string, Array<Word>>();
  lessons = new Map<string, Array<Line>>();
  songs = new Map<string, Array<Line>>();

  constructor(public httpClient: HttpClient) {
    this.LoadZhuyin();
  }

  LoadZhuyin() {
    this.httpClient.get(ASSETS_PATH+'zhuyin.txt', { responseType: 'text' }).subscribe((response) => {
      response.split(LINE_BREAK).map(e => e.split(ITEM_BREAK)).forEach((e, i) => this.zhuyin.set(e[0], e[1]));
      return this.zhuyin;
    })
  }

  LoadWords(lesson:string) {
    if (this.words.has(lesson)) {
      return;
    }
    let path = ASSETS_PATH + lesson + "_voc.txt";
    this.httpClient.get(path, { responseType: 'text' }).subscribe((response) => {
      this.words.set(lesson, []);
      response.split(LINE_BREAK).map(e => e.split(ITEM_BREAK)).forEach((e, i) => {
        let word: Word = {
          content: e[0],
          start: e[1] ? parseFloat(e[1]) : -1,
          duration: e[2] ? parseFloat(e[2]) : -1,
        };
        this.words.get(lesson)?.push(word)
      });
    });
  }

  LoadLesson(lesson:string) {
    if (this.lessons.has(lesson)) {
      return;
    }
    let path = ASSETS_PATH + lesson + ".txt";
    this.httpClient.get(path, { responseType: 'text' }).subscribe((response) => {
      this.lessons.set(lesson, []);
      response.split(LINE_BREAK).map(e => e.split(ITEM_BREAK)).forEach((e, i) => {
        let line: Line = {
          word: e[0],
          start: e[2] ? parseFloat(e[2]) : -1,
          duration: e[3] ? parseFloat(e[3]) : -1,
          tags:　e[1] && e[1].length > 0 ?  e[1].split(SUB_ITEM_BREAK) : []
        };
        this.lessons.get(lesson)?.push(line)
      });
    });
  }

  LoadLyric(song:string, call_back:Function) {
    if (this.songs.has(song)) {
      call_back();
      return;
    }
    let path = ASSETS_PATH + song + ".lyrics";
    this.httpClient.get(path, { responseType: 'text' }).subscribe((response) => {
      this.songs.set(song, []);
      response.split(LINE_BREAK).map(e => e.split(ITEM_BREAK)).forEach((e, i) => {
        let line: Line = {
          word: e[0],
          start: e[2] ? parseFloat(e[2]) : -1,
          duration: e[3] ? parseFloat(e[3]) : -1,
          tags:　e[1] && e[1].length > 0 ?  e[1].split(SUB_ITEM_BREAK) : []
        };
        this.songs.get(song)?.push(line)
        call_back()
      });
    });
  }

  GetLessonList() {
    return this.httpClient.get(ASSETS_PATH + 'lessons', {responseType: 'json'})
  }

  GetSongList() {
    return this.httpClient.get(ASSETS_PATH + 'songs', {responseType: 'json'})
  }

    GetZhuyin() {
    return this.zhuyin;
  }

    GetLesson(lesson: string) {
    return this.lessons.get(lesson);
  }

   GetWords(lesson:string)  {
   return this.words.get(lesson);
  }

   GetLyric(song:string)  {
    return this.songs.get(song);
   }
}
