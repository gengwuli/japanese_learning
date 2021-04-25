import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SoundService } from '../sound.service';
import { TextService } from '../text.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {
  lesson: string = ""

  constructor(private route: ActivatedRoute, public soundService: SoundService, public textService: TextService) {
    this.lesson = "lesson" + this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
  }

  playLine(when: number, duration: number) {
    if (when <= 0 || duration <= 0) {
      return;
    }
    this.soundService.playLine(this.lesson, when, duration)
  }

  playWord(when: number, duration: number) {
    if (when <= 0 || duration <= 0) {
      return;
    }
    this.soundService.playWord(this.lesson, when, duration)
  }

  GetDialogs() {
    return this.textService.GetDiaglogs(this.lesson);
  }

  GetWords() {
    return this.textService.GetWords(this.lesson);
  }

  GetHeaders() {
    return this.textService.GetHeaders(this.lesson);
  }

  GetJiayis() {
    return this.textService.GetJiayis(this.lesson);
  }
}
