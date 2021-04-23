import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextService {
  zhuyin = new Map<string, string>()
  constructor() {
    this.LoadFiles();
  }

  GetZhuyin() {
    return this.zhuyin;
  }

  LoadFiles() {
    let req = new XMLHttpRequest();
    req.addEventListener("load", () => {
      req.responseText.split('\n').forEach(e => { let [key, value] = e.split(','); this.zhuyin?.set(key, value) });
    });
    req.open("GET", "assets/zhuyin.txt");
    req.send();
  }
}
