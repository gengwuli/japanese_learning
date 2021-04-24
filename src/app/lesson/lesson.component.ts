import { Component, OnInit, Input } from '@angular/core';
import { SoundService } from '../sound.service';
import { TextService } from '../text.service';
import { Word } from '../word';
import { Line } from '../line';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {
  words?: Word[];
  dialogs?: Line[]; 
  jiayis?: Line[]; 
  headers?: Line[]; 
  lesson: string = ""

  constructor(private route: ActivatedRoute,public soundService: SoundService, public textService: TextService) {
    this.lesson = "lesson" + this.route.snapshot.paramMap.get('id');
  }


  ngOnInit(): void {
    setTimeout(()=>{
      this.dialogs = this.textService.GetDiaglogs(this.lesson);
      this.jiayis = this.textService.GetJiayis(this.lesson);
      this.headers = this.textService.GetHeaders(this.lesson);
      this.words = this.textService.GetWords(this.lesson);
    }, 1000);
  }

  playLine(when: number, duration: number) {
    this.soundService.playLine(this.lesson, when, duration)
  }

  playWord(when: number, duration: number) {
    this.soundService.playWord(this.lesson, when, duration)
  }
}
