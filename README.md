Angular2 Sticky Directive
==============

Angular2 Sticky Directive (no jQuery is required) makes HTML elements sticky. For instance, the header, the menu, the sidebar or any other block can be stuck at the desired position.

### NPM

Install with npm:

```bash
npm install ng2-sticky-kit
```

Initial development environment:

```bash
npm run install
npm run typings
npm run build
```

Run demo application:

```bash
npm run lite-server
```

### Usage

**[sticky]** - makes an element sticky

    <div [sticky]>Sticky element</div>

**[sticky-zIndex]** : (_default 10_) - controls z-index CSS parameter of the sticky element

    <div [sticky] [sticky-zIndex="999"]>Sticky element</div>

**[sticky-offset-top]** : (_default 0_) - pixels between the top of the page or container and the element

**[sticky-offset-bottom]** : (_default 0_) - pixels between the bottom of the page or container and the element

    <div [sticky] [sticky-offset-top="20"] [sticky-offset-bottom="20"]>Sticky element</div>
    
**[sticky-start]** : (_default 0_) - position where the element should start to stick

    <div [sticky] [sticky-start="20"]>Sticky element</div>
    
**[sticky-class]** : (_default "sticky"_) - CSS class that will be added after the element starts sticking
   
**[sticky-end-class]** : (_default "sticky-end"_) - CSS class that will be added to the sticky element after it ends sticking

**[sticky-media-query]** : (_default ""_) - media query that allows to use sticky

**[sticky-parent]** : (_default true_) - if true, then the sticky element will be stuck relatively to the parent containers. Otherwise, _window_ will be used as the parent container. 

> NOTE: the "position: relative" styling is added to the parent element automatically in order to use the absolute positioning

### Example

```typescript
import {Component} from '@angular/core';
import {Sticky} from 'ng2-sticky-kit/ng2-sticky-kit';

@Component({
  selector: 'app',
  template: '<div [sticky]>demo</div>',
  directives: [
    Sticky
  ]
})
export class DemoComponent { }
```

If you are using system.js, don't forget to add 'ng2-sticky-kit' to your list of packages.