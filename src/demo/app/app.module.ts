import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StickyModule } from 'ng2-sticky-kit';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, StickyModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
