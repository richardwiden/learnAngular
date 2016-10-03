import {Component, OnInit} from '@angular/core';
import {Hero} from "../hero";
import {HeroService} from "../hero.service";
import {Router} from "@angular/router";


@Component({
    moduleId: module.id,
    selector: 'my-heroes',
    templateUrl: 'heroes.component.html',
    styleUrls: ['heroes.component.css']
})
export class HeroesComponent implements OnInit {

    constructor(private heroService: HeroService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.getHeroes();
    }


    heroes: Hero[];
    selectedHero: Hero;

    getHeroes(): void {
        this.heroService.getHeroes().then(heroes=>this.heroes = heroes);
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
        this.heroService.create(name).then(hero=> {
            this.heroes.push(hero);
            this.selectedHero = null;
        })
    }

    delete(hero: Hero) {
        this.heroService.delete(hero.id)
            .then(()=> {
                this.heroes = this.heroes.filter((h)=>h !== hero);
                if (this.selectedHero === hero) this.selectedHero = null;
            })
    }
}

