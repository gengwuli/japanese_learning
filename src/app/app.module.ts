import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Yin50Component } from './yin50/yin50.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { VocabularyComponent } from './vocabulary/vocabulary.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RichlineComponent } from './richline/richline.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LessonComponent } from './lesson/lesson.component';
import { MobxAngularModule } from 'mobx-angular';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [
    AppComponent,
    Yin50Component,
    SideNavComponent,
    VocabularyComponent,
    RichlineComponent,
    LessonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatGridListModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule, 
    MatTabsModule,
    MatInputModule,
    HttpClientModule,
    MobxAngularModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
