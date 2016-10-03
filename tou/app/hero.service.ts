import {Injectable} from "@angular/core";
import {Hero} from "./hero";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

@Injectable()
export class HeroService {
    private heroesUrl = '/heroes';
    private headers = new Headers({'Content-Type': 'application/json'});


    constructor(private http: Http,
                private af: AngularFire) {
    }

    getHeroes(): FirebaseListObservable<Hero[]> {
        return this.af.database.list('/heroes');
    }

    getHero(id: number): FirebaseObjectObservable<Hero> {
        return this.af.database.object('/heroes/' + id);
    }

    create(name: string): Promise<Hero> {
        //noinspection TypeScriptUnresolvedFunction
        return this.af.database.list('/heroes')
            .push({name: name})
            .once('value');
    }

    update(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http.put(url, JSON.stringify(hero), {headers: this.headers}).toPromise()
            .then(()=>hero)
            .catch(HeroService.handleError);

    }

    delete(key: String): Promise<void> {
        if(!key) return Promise.reject("Empty key");
        const url = `${this.heroesUrl}/${key}`;
        console.log(url);
        return this.af.database.object(url).remove()
            .then(()=>null)
            .catch((error)=> HeroService.handleError(error));
    }

    private static handleError(error: any): Promise<any> {
        console.error('An error ocurred', error);
        return Promise.reject(error.message() || error);
    }
}