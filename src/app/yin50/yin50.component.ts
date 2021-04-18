import { Component, OnInit } from '@angular/core';
import { SoundService } from '../sound.service';



@Component({
  selector: 'app-yin50',
  templateUrl: './yin50.component.html',
  styleUrls: ['./yin50.component.css']
})
export class Yin50Component implements OnInit {

  constructor( public soundService: SoundService) {}

  ngOnInit(): void {
  }

}
