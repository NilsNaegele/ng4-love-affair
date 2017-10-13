import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-hero-detail',
  template: `
  <div *ngIf="hero">
      <h2>{{ hero.name }} details!</h2>
      <div><label>id: </label>{{ hero.id }}</div>
      <div><label>name: </label>
      <input [(ngModel)]="hero.name" placeholder="name">
      </div>
      <div><label>description: </label>{{ hero.description }}</div>
      <button (click)="save()">Save</button>
      <button (click)="goBack()">Back</button>
  </div>
  `,
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;

  constructor(private heroService: HeroService, private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
  this.route.paramMap.switchMap((params: ParamMap) => this.heroService.getHero(+params.get('id')))
                      .subscribe(hero => this.hero = hero);
              }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.update(this.hero).then(() => this.goBack());
  }

}
