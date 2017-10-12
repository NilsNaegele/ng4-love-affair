import { Component } from '@angular/core';

import { Hero } from './hero';

const HEROES: Hero[] = [
        { id: 11, name: 'Angular Team', description: 'SuperHeroic, Ambitious, Dream Team' },
        { id: 12, name: 'Igor', description: 'Angular Team Lead' },
        { id: 13, name: 'Carmen', description: 'Machine Learning, Neural Nets, Web Components, Polymer Princess' },
        { id: 14, name: 'Misko', description: 'Father Of Angular' },
        { id: 15, name: 'Hans', description: 'Angular CLI Branch Master' },
        { id: 16, name: 'Tobias', description: 'Angular Compiler' },
        { id: 17, name: 'Alex', description: 'Angular Compiler' },
        { id: 18, name: 'Rob', description: 'All Round Talent, Angular Redux' },
        { id: 19, name: 'Stephen', description: 'The Voice Of Angular (A Techie)' },
        { id: 20, name: 'Nils', description: 'Angular Lover' }
];

@Component({
  selector: 'app-my-family',
  template: `
      <h1>{{ title }}</h1>
      <h2>My Heroes</h2>
      <ul class="heroes">
            <li *ngFor="let hero of heroes" (click)="onSelect(hero)" [class.selected]="hero === selectedHero">
                <span class="badge">{{ hero.id }}</span> {{ hero.name }}
            </li>
      </ul>
      <app-hero-detail [hero]="selectedHero"></app-hero-detail>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
  heroes = HEROES;
  selectedHero: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

}
