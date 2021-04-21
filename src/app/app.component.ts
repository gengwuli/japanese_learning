import { Component } from '@angular/core';
import { SoundService } from './sound.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( public soundService: SoundService) {}

  ngOnInit() {
    console.log(`OnInit`);
  }

  toggle() {

  }
}
