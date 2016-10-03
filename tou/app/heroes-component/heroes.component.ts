import {Component, OnInit, OnDestroy} from '@angular/core';
import {Hero} from "../hero";
import {HeroService} from "../hero.service";
import {Router} from "@angular/router";
import {FirebaseListObservable} from 'angularfire2';
import {Subscription} from "rxjs/Subscription";

@Component({
    moduleId: module.id,
    selector: 'my-heroes',
    templateUrl: 'heroes.component.html',
    styleUrls: ['heroes.component.css']
})
export class HeroesComponent implements OnInit,OnDestroy {
    heroes: Hero[];
    selectedHero: Hero;
    subscription: Subscription;

    constructor(private heroService: HeroService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.getHeroes();
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }


    getHeroes(): void {
        if (!this.subscription)
            this.subscription = this.heroService.getHeroes().subscribe(heroes=> {
                this.heroes = heroes;
            });
    }

    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }

    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedHero.id]);
    }

    add(name: string) {
        if (!name) return;
        name = name.trim();
        if (name == '') return;
        this.heroService.create(name).then(()=> {
            this.selectedHero = null;
        })
    }

    delete(hero: Hero) {
        this.heroService.delete(hero.$key)
            .then(()=> {
                this.heroes = this.heroes.filter((h)=>h !== hero);
                if (this.selectedHero === hero) this.selectedHero = null;
            })
    }
}

