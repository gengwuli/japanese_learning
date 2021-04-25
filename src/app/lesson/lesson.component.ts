import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SoundService } from '../sound.service';
import { TextService } from '../text.service';
import {  Router, NavigationEnd } from '@angular/router';
import { makeAutoObservable } from 'mobx';
import {filter} from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {
  lesson = '';
  notes_path = '';

  constructor(private router: Router, public soundService: SoundService, public textService: TextService) {
    makeAutoObservable(this)
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(e => this.routeListener(e));

  }
  
  private routeListener(event:any) {
    this.lesson = "lesson" + event.urlAfterRedirects.split('/').pop();
    this.notes_path = "assets/" + this.lesson + "_notes.md";
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

  GetWords() {
    return this.textService.GetWords(this.lesson);
  }

  GetLines() {
    return this.textService.GetLesson(this.lesson);
  }
}
