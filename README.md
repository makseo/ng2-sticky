Angular Sticky
==============

Angular Sticky (no jQuery is required) makes HTML elements sticky. For instance, the header, the menu, the sidebar or any other block can be stuck at the desired position.

Supports Angular+ versions

### NPM

Install with npm:

```bash
npm install ng2-sticky-kit --save
```

Initial development environment:

```bash
npm install
npm run build
```

Run demo application:

```bash
npm run serve
```

### Usage

**[sticky]** - makes an element sticky

    <sticky>Sticky element</sticky>
    <div sticky>Sticky div</div>
    
**[sticky-orientation]** : (_default "none"_) - orientation for sticky element ("left", "right", "none")

**[sticky-zIndex]** : (_default 10_) - controls z-index CSS parameter of the sticky element

    <sticky sticky-zIndex="999">Sticky element</sticky>
    
**[sticky-width]** : (_default "auto"_) - width of the sticky element

**[sticky-offset-top]** : (_default 0_) - pixels between the top of the page or container and the element

**[sticky-offset-bottom]** : (_default 0_) - pixels between the bottom of the page or container and the element

    <sticky sticky-offset-top="20" sticky-offset-bottom="20">Sticky element</sticky>
    
**[sticky-start]** : (_default 0_) - position where the element should start to stick

    <sticky sticky-start="20">Sticky element</sticky>
    
**[sticky-class]** : (_default "sticky"_) - CSS class that will be added after the element starts sticking
   
**[sticky-end-class]** : (_default "sticky-end"_) - CSS class that will be added to the sticky element after it ends sticking

**[sticky-media-query]** : (_default ""_) - media query that allows to use sticky

**[sticky-parent]** : (_default true_) - if true, then the sticky element will be stuck relatively to the parent containers. Otherwise, _window_ will be used as the parent container. 

> NOTE: the "position: relative" styling is added to the parent element automatically in order to use the absolute positioning

### Example

app.module.ts
```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {StickyModule} from 'ng2-sticky-kit';
import {AppComponent} from './app.component';

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
export class AppModule { }
```

app.component.ts
```typescript
import {Component} from '@angular/core';

@Component({
  selector: 'app',
  template: '<sticky [sticky-offset-top]="20"><div>demo</div></sticky>',
})
export class DemoComponent { }
```

**If you are using system.js, don't forget to add 'ng2-sticky-kit' to your list of packages.**
