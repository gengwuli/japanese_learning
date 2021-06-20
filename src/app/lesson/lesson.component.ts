import { Component, OnInit, ElementRef } from '@angular/core';
import { SoundService } from '../sound.service';
import { TextService, ASSETS_PATH } from '../text.service';
import {  Router, NavigationEnd } from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {
  lesson = '';
  notes_path = '';

  constructor(private router: Router, 
    public soundService: SoundService, 
    public textService: TextService,private elRef:ElementRef) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(e => this.routeListener(e));
  }
  ngOnInit(): void {
  }
  
  private routeListener(event:any) {
    if (!event.urlAfterRedirects.includes("lesson")) {
      return;
    }
    this.lesson = "lesson" + event.urlAfterRedirects.split('/').pop();
    this.notes_path = ASSETS_PATH + this.lesson + "_notes.md";
    this.soundService.LoadSound(this.lesson)
    this.soundService.LoadSound(this.lesson + "_voc")
    this.textService.LoadLesson(this.lesson)
    this.textService.LoadWords(this.lesson)
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

  GetWords() {
    return this.textService.GetWords(this.lesson);
  }

  GetLines() {
    return this.textService.GetLesson(this.lesson);
  }
}
