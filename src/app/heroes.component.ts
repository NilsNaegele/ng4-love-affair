import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-heroes',
  template: `
      <h2>My Heroes</h2>
      <div>
              <label>New Hero Name:</label> <input #heroName>
              <button class="add-button" (click)="add(heroName.value); heroName.value='';">Add</button>
      </div>
      <ul class="heroes">
            <li *ngFor="let hero of heroes" (click)="onSelect(hero)" [class.selected]="hero === selectedHero">
                <span class="badge">{{ hero.id }}</span>
                <span>{{ hero.name }}</span>
                <button class="delete-button" (click)="delete(hero); $event.stopPropagation();">
                  x
                </button>
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

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name).then(hero => {
                    this.heroes.push(hero);
                    this.selectedHero = null;
    });
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

  delete(hero: Hero): void {
    console.log(hero.name);
    this.heroService.delete(hero.id).then(() => {
                    this.heroes = this.heroes.filter(h => h !== hero);
                    if (this.selectedHero === hero) { this.selectedHero = null; }
    });
  }

}
