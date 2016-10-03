import {Component, Input, OnInit} from "@angular/core";
import {Hero} from "./hero";
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from '@angular/common';
import {HeroService} from "./hero.service";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'my-hero-detail',
    template: `
<div *ngIf="hero">
    <h2>{{hero.name}} details!</h2>
    <div><label>id: </label>{{hero.$key}}</div>
    <div>
        <label>name: </label>
        <input [(ngModel)]="hero.name" placeholder="name"/>
    </div>
    <button (click)="save()">Save</button>
</div>`
})
export class HeroDetailComponent implements OnInit {
    @Input() hero: Hero;
    private subscription:Subscription;

    constructor(private heroService: HeroService,
                private route: ActivatedRoute,
                private location: Location) {

    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params)=> {
            let key: string = params['key'];
            this.subscription = this.heroService.getHero(key).subscribe((hero)=>this.hero = hero);
        });
    }

    save(): void {
        this.heroService.update(this.hero).then(()=> this.goBack());
    }

    goBack(): void {
        this.location.back();
    }

}