import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .hero {
      text-align: center;
      height: 90vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-family: sans-serif;
    }
  `]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
