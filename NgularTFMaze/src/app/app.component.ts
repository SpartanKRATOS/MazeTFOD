import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HandGesture } from './hand-gesture-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('video') video: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('home') home: ElementRef<HTMLAnchorElement>;
  @ViewChild('about') about: ElementRef<HTMLAnchorElement>;
  opened$ = this._recognizer.swipe$.pipe(
    filter((value) => value === 'left' || value === 'right'),
    map((value) => value === 'right')
   
  );
  selection$ = this._recognizer.gesture$.pipe(
    filter((value) => value === 'one' || value === 'two'),
    map((value) => (value === 'one' ? 'home' : 'about'))
  );

  constructor(private _recognizer: HandGesture, private _router: Router){

  }
  
  get stream(){
    return this._recognizer.stream;
  }

  ngAfterViewInit(): void {
    this._recognizer.initialize(
      this.canvas.nativeElement,
      this.video.nativeElement
    );
  }
}
 