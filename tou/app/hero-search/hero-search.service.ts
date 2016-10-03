import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Hero} from "../hero";
import {Observable} from "rxjs";
@Injectable()
export class HeroSearchService {
    private searchUrl = 'app/heroes';

    constructor(private http: Http) {
    }

    search(term: String): Observable<Hero[]> {
        return this.http
            .get(`${this.searchUrl}/?name=${term}`)
            .map((r: Response)=> r.json().data as Hero []);
    }
}
