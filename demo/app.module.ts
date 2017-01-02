import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {StickyModule} from '../fixed-ng2-sticky-kit';

@NgModule({
    imports: [
        BrowserModule,
        StickyModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
