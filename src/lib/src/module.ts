import { NgModule } from '@angular/core';
import { StickyDirective, StickyComponent } from './component/sticky.component';

@NgModule({
  declarations: [StickyComponent, StickyDirective],
  exports: [StickyComponent, StickyDirective]
})
export class StickyModule { }
