import {Component, OnInit} from '@angular/core';
import {HeroSearchService} from "./hero-search.service";
import {Router} from "@angular/router";
import {Subject, Observable} from "rxjs";
import {Hero} from "./hero";

@Component({
    moduleId: module.id,
    selector: 'hero-search',
    templateUrl: 'hero-search.component.html',
    styleUrls: ['hero-search.component.css'],
    providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
    private searchTerms = new Subject<string>();
    heroes: Observable<Hero[]>;

    constructor(private heroSearchService: HeroSearchService,
                private router: Router) {
    }

    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit() {
        this.heroes = this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(term=>term ? this.heroSearchService.search(term) : Observable.of<Hero[]>([]))
            .catch(error=> {
                console.log(error)
                return Observable.of<Hero[]>([]);
            })
    }

    gotoDetail(hero: Hero): void {
        let link = ['/detail', hero.id];
        this.router.navigate(link);
    }

}
