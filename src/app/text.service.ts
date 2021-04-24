import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Line } from './line';
import { Word } from './word';
import { LESSONS } from './app.constants';
import { observable, computed } from 'mobx-angular';

const LINE_BREAK = '\n'
const ITEM_BREAK = '|'
const SUB_ITEM_BREAK = ','

@Injectable({
  providedIn: 'root'
})
export class TextService {
  @observable zhuyin = new Map<string, string>();
  @observable dialogs = new Map<string, Array<Line>>();
  @observable headers = new Map<string, Array<Line>>();
  @observable jiayis = new Map<string, Array<Line>>();
  @observable words = new Map<string, Array<Word>>();
  lessons = LESSONS;
  constructor(public httpClient: HttpClient) {
    this.httpClient.get('assets/zhuyin.txt', { responseType: 'text' }).subscribe((response) => {
      response.split(LINE_BREAK).map(e => e.split(ITEM_BREAK)).forEach((e, i) => this.zhuyin.set(e[0], e[1]));
      return this.zhuyin;
    })
    this.LoadLessons()
  }

  LoadLessons() {
    for (const lesson of this.lessons) {
      this.LoadDiaglogs(lesson);
      this.LoadHeaders(lesson);
      this.LoadJiayis(lesson);
      this.LoadWords(lesson);
    }
  }

  LoadDiaglogs(lesson:string) {
    let path = 'assets/' + lesson + "_dialog.txt";
    this.httpClient.get(path, { responseType: 'text' }).subscribe((response) => {
      this.dialogs.set(lesson, []);
      response.split(LINE_BREAK).map(e => e.split(ITEM_BREAK)).forEach((e, i) => {
        let line: Line = {
          word: e[0],
          start: parseFloat(e[2]),
          duration: parseFloat(e[3]),
          tags: e[1].split(SUB_ITEM_BREAK)
        };
        this.dialogs.get(lesson)?.push(line)
      });
    });
  }

  LoadHeaders(lesson:string) {
    let path = 'assets/' + lesson + "_header.txt";
    this.httpClient.get(path, { responseType: 'text' }).subscribe((response) => {
      this.headers.set(lesson, []);
      response.split(LINE_BREAK).map(e => e.split(ITEM_BREAK)).forEach((e, i) => {
        let line: Line = {
          word: e[0],
          start: parseFloat(e[2]),
          duration: parseFloat(e[3]),
          tags: e[1].split(SUB_ITEM_BREAK)
        };
        this.headers.get(lesson)?.push(line)
      });
    });
  }

  LoadJiayis(lesson:string) {
    let path = 'assets/' + lesson + "_jiayi.txt";
    this.httpClient.get(path, { responseType: 'text' }).subscribe((response) => {
      this.jiayis.set(lesson, []);
      response.split(LINE_BREAK).map(e => e.split(ITEM_BREAK)).forEach((e, i) => {
        let line: Line = {
          word: e[0],
          start: parseFloat(e[2]),
          duration: parseFloat(e[3]),
          tags: e[1].split(SUB_ITEM_BREAK)
        };
        this.jiayis.get(lesson)?.push(line)
      });
    });
  }

  LoadWords(lesson:string) {
    let path = 'assets/' + lesson + "_voc.txt";
    this.httpClient.get(path, { responseType: 'text' }).subscribe((response) => {
      this.words.set(lesson, []);
      response.split(LINE_BREAK).map(e => e.split(ITEM_BREAK)).forEach((e, i) => {
        let word: Word = {
          content: e[0],
          start: parseFloat(e[1]),
          duration: parseFloat(e[2]),
        };
        this.words.get(lesson)?.push(word)
      });
    });
  }

  @computed  GetZhuyin() {
    return this.zhuyin;
  }

  @computed GetDiaglogs(lesson:string) {
    return this.dialogs.get(lesson);
  }

  @computed GetHeaders(lesson:string)  {
    return this.headers.get(lesson);

  }

  @computed GetJiayis(lesson:string) {
    return this.jiayis.get(lesson);

  }

  @computed GetWords(lesson:string)  {
   return this.words.get(lesson);
  }
}
