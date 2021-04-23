import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextService {
  zhuyin = new Map<string, string>();
  constructor() {
    this.LoadFiles();
  }

  GetZhuyin() {
    return this.zhuyin;
  }

  LoadFiles() {
    let req = new XMLHttpRequest();
    req.open("GET", "assets/zhuyin.txt", false);
    req.send(null);
    if (req.status === 200) {
      req.responseText.split('\n').forEach(e => { let [key, value] = e.split(','); this.zhuyin.set(key, value); });
    } else {
      alert("file load failure")
    }
  }
}
