import { Component } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-my-family',
  template: `
      <h1>{{ title }}</h1>
      <a routerLink="/heroes">Heroes</a>
      <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';

}
