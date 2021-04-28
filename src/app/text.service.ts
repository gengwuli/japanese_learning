import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Line } from './line';
import { Word } from './word';
import { LESSONS } from './app.constants';
import { observable, computed } from 'mobx-angular';

const LINE_BREAK = '\n'
const ITEM_BREAK = '|'
const SUB_ITEM_BREAK = ','
// Local path is 'assets/', have to put all under assets
export const ASSETS_PATH = 'https://gengwu.herokuapp.com/'

@Injectable({
  providedIn: 'root'
})
export class TextService {
  @observable zhuyin:Map<string, string> = new Map<string, string>();
  @observable words = new Map<string, Array<Word>>();
  @observable lessons = new Map<string, Array<Line>>();

  constructor(public httpClient: HttpClient) {
    this.LoadZhuyin();
    this.LoadLessons();
  }

  LoadLessons() {
    this.httpClient.get(ASSETS_PATH + 'lessons', {responseType: 'json'}).subscribe((resp) => {
      if (resp instanceof Array) {
        // Use LESSONS to test locally
        for (let lesson of resp) {
          this.LoadWords(lesson);
          this.LoadLesson(lesson);
        }
      }
    });
  }

  LoadZhuyin() {
    this.httpClient.get(ASSETS_PATH+'zhuyin.txt', { responseType: 'text' }).subscribe((response) => {
      response.split(LINE_BREAK).map(e => e.split(ITEM_BREAK)).forEach((e, i) => this.zhuyin.set(e[0], e[1]));
      return this.zhuyin;
    })
  }

  LoadWords(lesson:string) {
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

  @computed  GetLesson(lesson: string) {
    return this.lessons.get(lesson);
  }

  @computed  GetZhuyin() {
    return this.zhuyin;
  }

  @computed GetWords(lesson:string)  {
   return this.words.get(lesson);
  }
}
