Angular2 Sticky Directive
==============

Angular2 directive (no jQuery required) that allows to stick the elements such as header, menu, sidebar or any other block on the page.

### NPM

Install with npm:

```bash
npm install ng2-sticky-kit
```

### Usage

**[sticky]** - makes an element sticky

    <div [sticky]>Sticky element</div>

**[sticky-zIndex]** : (_default 10_) - controls CSS parameter z-index of the sticky element

    <div [sticky] [sticky-zIndex="999"]>Sticky element</div>

**[sticky-offset-top]** : (_default 0_) - pixels between the top of the page or container and the element

**[sticky-offset-bottom]** : (_default 0_) - pixels between the bottom of the page or container and the element

    <div [sticky] [sticky-offset-top="20"] [sticky-offset-bottom="20"]>Sticky element</div>
    
**[sticky-start]** : (_default 0_) - position where the element should start being sticky

    <div [sticky] [sticky-start="20"]>Sticky element</div>
    
**[sticky-class]** : (_default "sticky"_) - CSS class that will be added after the element is "sticky"
   
**[sticky-end-class]** : (_default "sticky-end"_) - CSS class that will be added after the element ends to be "sticky"

**[sticky-media-query]** : (_default ""_) - media query that allows to use sticky

**[sticky-parent]** : (_default true_) - element relates to the parent container 

> NOTE: parent container assign automatically a "position: relative" styling in order to use the absolute positioning
