import { Component } from '@angular/core';

export class Hero {
  id: number;
  name: string;
}

const HEROES: Hero[] = [
        { id: 11, name: 'Angular Team' },
        { id: 12, name: 'Igor' },
        { id: 13, name: 'Carmen' },
        { id: 14, name: 'Misko' },
        { id: 15, name: 'Hans' },
        { id: 16, name: 'Tobias' },
        { id: 17, name: 'Alex' },
        { id: 18, name: 'Rob' },
        { id: 19, name: 'Stephen' },
        { id: 20, name: 'Nils' }
];

@Component({
  selector: 'my-app',
  template: `
      <h1>{{ title }}</h1>
      <h2>My Heroes</h2>
      <ul class="heroes">
            <li *ngFor="let hero of heroes" (click)="onSelect(hero)" [class.selected]="hero === selectedHero">
                <span class="badge">{{ hero.id }}</span> {{ hero.name }}
            </li>
      </ul>
      <div *ngIf="selectedHero">
          <h2>{{ selectedHero.name }} details!</h2>
          <div><label>id: </label>{{ selectedHero.id }}</div>
          <div><label>name: </label>
          <input [(ngModel)]="selectedHero.name" placeholder="name">
          </div>
      </div>
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
