import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {Sticky} from '../src/ng2-sticky/ng2-sticky';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        AppComponent,
        Sticky
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}