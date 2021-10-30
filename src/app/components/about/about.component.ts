import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public title: string;
  public subtitle: string;
  public web: string;

  constructor() {
    this.title="Josimar Sánchez";
    this.subtitle="Full stack developer senior";
    this.web="www.jsa.co";
   }

  ngOnInit(): void {
  }

}
