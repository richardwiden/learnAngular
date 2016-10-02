import {Injectable} from "@angular/core";
import {Hero} from "./hero";
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {
    private heroesUrl = 'app/heroes';
    private headers = new Headers({'Content-Type': 'application/json'});


    constructor(private http: Http) {
    }

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl).toPromise()
            .then(response => response.json().data as Hero [])
            .catch(HeroService.handleError);
    }

    getHero(id: number): Promise<Hero> {
        return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id));
    }

    create(name: string): Promise<Hero> {
        return this.http
            .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers}).toPromise()
            .then(res=>res.json().data)
            .catch(HeroService.handleError);
    }

    update(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http.put(url, JSON.stringify(hero), {headers: this.headers}).toPromise()
            .then(()=>hero)
            .catch(HeroService.handleError);

    }

    delete(id: number): Promise<void> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers}).toPromise()
            .then(()=>null)
            .catch(HeroService.handleError);
    }

    private static handleError(error: any): Promise<any> {
        console.error('An error ocurred', error);
        return Promise.reject(error.message() || error);
    }
}