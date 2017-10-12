import { Component, Input } from '@angular/core';

import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  template: `
  <div *ngIf="hero">
      <h2>{{ hero.name }} details!</h2>
      <div><label>id: </label>{{ hero.id }}</div>
      <div><label>name: </label>
      <input [(ngModel)]="hero.name" placeholder="name">
      </div>
      <div><label>description: </label>
        <span>{{ hero.description }}</span>
      </div>
  </div>
  `
})
export class HeroDetailComponent {
  @Input() hero: Hero;

}
