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

    getHero(key: string): FirebaseObjectObservable<Hero> {
        return this.af.database.object('/heroes/' + key);
    }

    create(name: string): Promise<Hero> {
        //noinspection TypeScriptUnresolvedFunction
        return this.af.database.list('/heroes')
            .push({name: name})
            .once('value');
    }

    update(hero: Hero): Promise<void> {
        const url = `${this.heroesUrl}/${hero.$key}`;
        delete(hero.$key);
        let obj = JSON.parse(JSON.stringify(hero));

        //noinspection TypeScriptValidateTypes
        return this.af.database.object(url).update(obj);
    }

    delete(key: String): Promise<void> {
        if (!key) return Promise.reject("Empty key");
        const url = `${this.heroesUrl}/${key}`;
        console.log(url);
        //noinspection TypeScriptUnresolvedFunction
        return this.af.database.object(url).remove()
            .then(()=>null)
            .catch((error)=> HeroService.handleError(error));
    }

    private static handleError(error: any): Promise<any> {
        console.error('An error ocurred', error);
        return Promise.reject(error.message() || error);
    }
}