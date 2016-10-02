import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent}   from './app.component';
import {FormsModule} from "@angular/forms";
import {HeroDetailComponent} from "./hero-detail.component";
import {HeroService} from "./hero.service";
import {HeroesComponent} from "./heroes.component";
import {routing} from "./app.routing";
import {DashboardComponent} from "./dashboard.component";
import {HttpModule} from "@angular/http";
import {InMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "./in-memory-data.service";
import {HeroSearchComponent} from "./hero-search.component";
import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
    apiKey: "AIzaSyA6SW4Ar2MGoSDR1Q0Pf_fSN5UvxLbF0vo",
    authDomain: "quantum-fusion-104816.firebaseapp.com",
    databaseURL: "https://quantum-fusion-104816.firebaseio.com",
    storageBucket: "quantum-fusion-104816.appspot.com",
    messagingSenderId: "371142456682"
};
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
        routing,
        AngularFireModule.initializeApp(firebaseConfig)],
    declarations: [
        AppComponent,
        HeroDetailComponent,
        HeroesComponent,
        DashboardComponent,
        HeroSearchComponent],
    providers: [HeroService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
