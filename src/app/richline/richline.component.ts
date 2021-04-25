import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { TextService } from '../text.service';
import { observable, computed } from 'mobx-angular';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-richline',
  templateUrl: './richline.component.html',
  styleUrls: ['./richline.component.css']
})
export class RichlineComponent implements OnInit {
  @Input() tags?= ["李"];
  @Input() line?: string = "李さんは中国人です";
  @observable segments?: Array<any>;
  constructor(public textService: TextService) {
  }

  ngOnInit(): void {
        // 日本語,本, only the shorter one is annotated.
    // So sort by length and pop the longer one out first.
    this.tags!.sort((a,b)=>a.length - b.length);
    // Have to make a copy of this.tags, otherwise it will be modified
    // inside GetElements after calling tags.pop().
    this.segments = this.GetElements(this.line, [...this.tags!]); 
  }

  @computed GetElements(line?: string, tags?: Array<string>): any {
    if (!line) {
      return []
    }
    if (!tags || tags.length == 0) {
      return [line]
    }
    let res = []
    // Have to iterate through every tag until we found the first one that's
    // in the line. e.g "李さんは " ["李", "社員"], here, we have to ignore
    // "社員" and continue with "李"
    let key = tags.pop(); 
    // We know if the key doesn't exists in the line, there's no need to 
    // split further. Only split if the key is in the line. Or we can 
    // filter beforehand.
    while (tags.length > 0 && line.indexOf(key!) == -1) {
      key = tags.pop();
    }
    let translation = [key, this.textService.GetZhuyin().get(key!)];
    // Same character might have different annotation like 母(はは)母(かあ)
    // So allow special designation using ()
    let index = key?.indexOf('(');
    if (index != -1) {
      let yin = key?.substr(index! + 1, key.length - index! - 2);
      key = key?.substr(0, index);
      translation = [key, yin]
    }
    let sublines = line.split(key!);
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
      // Have to make a copy, as we can only guarantee there's no 
      // key in sublines after we split by key. 
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
