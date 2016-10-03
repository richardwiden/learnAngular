import {Component, OnInit, OnDestroy} from "@angular/core";
import {HeroService} from "../hero.service";
import {Hero} from "../hero";
import {Router} from "@angular/router";
import '../rxjs-extensions'
import {Subscription} from "rxjs/Subscription";

@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy {
    heroes: Hero[];
    subscription: Subscription;

    constructor(private heroService: HeroService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.subscription = this.heroService.getHeroes().subscribe(heroes=> {
            this.heroes = heroes;
            console.log(JSON.stringify(heroes));
        })
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }

    gotoDetail(hero: Hero): void {
        let link = ['/detail', hero.$key];
        this.router.navigate(link);
    }
}
