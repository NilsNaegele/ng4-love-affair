import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-heroes',
  template: `
      <h2>My Heroes</h2>
      <ul class="heroes">
            <li *ngFor="let hero of heroes" (click)="onSelect(hero)" [class.selected]="hero === selectedHero">
                <span class="badge">{{ hero.id }}</span> {{ hero.name }}
            </li>
      </ul>
      <div *ngIf="selectedHero">
            <h2>
                  {{ selectedHero.name | uppercase }} is my hero
            </h2>
            <button class="back-button" (click)="gotoDetail()">View Details</button>
      </div>
  `,
  providers: [ HeroService ],
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  title = 'Tour of Heroes';
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService, private router: Router) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

}
