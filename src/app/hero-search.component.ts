import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HeroSearchService } from './hero-search.service';
import { Hero } from './hero';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-hero-search',
  template: `
              <div id="search-component">
                    <h4>Hero Search</h4>
                    <input #searchBox id="search-box" (keyup)="search(searchBox.value)">
                <div>
                    <div *ngFor="let hero of heroes | async" (click)="gotoDetail(hero)" class="search-result">
                    {{ hero.name }}
                    </div>
                </div>
              </div>
  `,
  styleUrls: ['./hero-search.component.css'],
  providers: [ HeroSearchService ]
})
export class HeroSearchComponent implements OnInit {

      heroes: Observable<Hero[]>;
      private searchTerms = new Subject<string>();

      constructor(private heroSearchService: HeroSearchService, private router: Router) { }

      // push search term into observable stream
      search(term: string): void {
        this.searchTerms.next(term);
      }

      ngOnInit(): void {
        this.heroes = this.searchTerms
                      .debounceTime(200)      // wait 200ms after each keystroke before considering term
                      .distinctUntilChanged() // ignore if next search term is same as previous
                      .switchMap(term => term // switch to new observable each time term changes
                        // return HTTP search observable
                      ? this.heroSearchService.search(term)
                      // or observable of empty heroes if there is no such search term
                      : Observable.of<Hero[]>([]))
                      .catch(error => {
                        return this.handleError(error);
                      });
              }

      gotoDetail(hero: Hero): void {
        const link = ['/detail', hero.id];
        this.router.navigate(link);
      }

      private handleError(error: any): Observable<Hero[]> {
          console.error('An error occured', error);
          return Observable.of<Hero[]>([]);
        }

}
