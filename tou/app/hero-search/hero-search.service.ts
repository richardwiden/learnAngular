import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Hero} from "../hero";
import {Observable} from "rxjs";
import {AngularFire} from 'angularfire2';
@Injectable()
export class HeroSearchService {
    private searchUrl = '/heroes';

    constructor(private http: Http,
                private af: AngularFire) {
    }

    search(term: String): Observable<Hero[]> {
        return this.af.database.list(this.searchUrl, {
            query: {
                orderByChild: 'name_search',
                startAt: term,
                endAt: term + '\uf8ff',
                limitToFirst: 2
            }
        })
    }
}
