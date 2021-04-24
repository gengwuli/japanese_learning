import { Component, OnInit, Input } from '@angular/core';
import { TextService } from '../text.service';

@Component({
  selector: 'app-richline',
  templateUrl: './richline.component.html',
  styleUrls: ['./richline.component.css']
})
export class RichlineComponent implements OnInit {
  @Input() tags?= ["李"];
  @Input() line?: string = "李さんは中国人です";
  zhuyinMap = new Map();
  segments?: Array<any>;
  textService: any;
  constructor(textService: TextService) {
    this.textService = textService
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.zhuyinMap = this.textService.GetZhuyin();
      this.segments = this.GetElements(this.line, this.tags); 
    }, 1000)
  }

  GetElements(line?: string, tags?: Array<any>): any {
    if (!line) {
      return []
    }
    if (!tags || tags.length == 0) {
      return [line]
    }
    let res = []
    let key = tags.pop();
    let translation = [key, this.zhuyinMap.get(key)];
    let sublines = line.split(key);
    if (sublines.length == 1) {
      return line;
    }
    let has_beginning = sublines[0].length == 0;
    let has_end = sublines[sublines.length - 1].length == 0;
    if (has_beginning) {
      sublines = sublines.slice(1);
      res.push(translation);
    }
    if (has_end) {
      sublines.pop();
    }
    for (let sub_line of sublines) {
      for (let ele of this.GetElements(sub_line, [...tags])) {
        res.push(ele);
      }
      res.push(translation);
    }
    res.pop()
    if (has_end) {
      res.push(translation);
    }
    return res
  }


}
