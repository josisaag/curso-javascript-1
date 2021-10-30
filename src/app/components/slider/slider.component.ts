import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() anchura:number;

  constructor() {
    this.anchura=0;
   }

  ngOnInit(): void {
    ($('.galeria') as any).bxSlider({
      auto: true,
      autoControls: false,
      stopAutoOnClick: false,
      pager: true,
      slideWidth: 300,
      captions:true
    });
  }

}
