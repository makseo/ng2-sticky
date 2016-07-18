import {Component} from '@angular/core';
import {Sticky} from '../src/ng2-sticky/ng2-sticky';

@Component({
  selector: 'app',
  templateUrl: 'demo/sticky-demo.component.html',
  directives: [
    Sticky
  ]
})
export class AppComponent { }