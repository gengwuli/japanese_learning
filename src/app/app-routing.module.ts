import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Yin50Component } from './yin50/yin50.component';
import { Chapter1Component } from './chapter1/chapter1.component';
import { VocabularyComponent } from './vocabulary/vocabulary.component';
import { Chapter2Component } from './chapter2/chapter2.component';

const routes: Routes = [
  { path: 'yin50', component: Yin50Component },
  { path: 'vocabulary', component: VocabularyComponent },
  { path: 'chapter1', component: Chapter1Component },
  { path: 'chapter2', component: Chapter2Component }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
