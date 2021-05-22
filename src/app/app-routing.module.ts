import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Yin50Component } from './yin50/yin50.component';
import { VocabularyComponent } from './vocabulary/vocabulary.component';
import { LessonComponent } from './lesson/lesson.component';
import { LyricComponent } from './lyric/lyric.component';

const routes: Routes = [
  { path: 'yin50', component: Yin50Component },
  { path: 'vocabulary', component: VocabularyComponent },
  { path: 'lyric', component: LyricComponent },
  { path: 'lesson/:id', component: LessonComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
