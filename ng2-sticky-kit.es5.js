import { Component, ElementRef, EventEmitter, HostListener, Input, NgModule, Output } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var StickyComponent = (function () {
    function StickyComponent(element) {
        this.element = element;
        this.zIndex = 10;
        this.width = 'auto';
        this.offsetTop = 0;
        this.offsetBottom = 0;
        this.start = 0;
        this.stickClass = 'sticky';
        this.endStickClass = 'sticky-end';
        this.mediaQuery = '';
        this.parentMode = true;
        this.orientation = 'none';
        this.activated = new EventEmitter();
        this.deactivated = new EventEmitter();
        this.reset = new EventEmitter();
        this.isStuck = false;
    }
    /**
     * @return {?}
     */
    StickyComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.elem = this.element.nativeElement;
    };
    /**
     * @return {?}
     */
    StickyComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        // define scroll container as parent element
        this.container = this.elem.parentNode;
        this.defineOriginalDimensions();
        this.sticker();
    };
    /**
     * @return {?}
     */
    StickyComponent.prototype.onChange = /**
     * @return {?}
     */
    function () {
        this.sticker();
    };
    /**
     * @return {?}
     */
    StickyComponent.prototype.defineOriginalDimensions = /**
     * @return {?}
     */
    function () {
        this.originalCss = {
            zIndex: this.getCssValue(this.elem, 'zIndex'),
            position: this.getCssValue(this.elem, 'position'),
            top: this.getCssValue(this.elem, 'top'),
            right: this.getCssValue(this.elem, 'right'),
            left: this.getCssValue(this.elem, 'left'),
            bottom: this.getCssValue(this.elem, 'bottom'),
            width: this.getCssValue(this.elem, 'width'),
        };
        if (this.width === 'auto') {
            this.width = this.originalCss.width;
        }
    };
    /**
     * @return {?}
     */
    StickyComponent.prototype.defineDimensions = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ containerTop = this.getBoundingClientRectValue(this.container, 'top');
        this.windowHeight = window.innerHeight;
        this.elemHeight = this.getCssNumber(this.elem, 'height');
        this.containerHeight = this.getCssNumber(this.container, 'height');
        this.containerStart = containerTop + this.scrollbarYPos() - this.offsetTop + this.start;
        if (this.parentMode) {
            this.scrollFinish = this.containerStart - this.start - this.offsetBottom + (this.containerHeight - this.elemHeight);
            this.elem.style.width = this.elem.parentNode.offsetWidth + 'px';
        }
        else {
            this.scrollFinish = document.body.offsetHeight;
        }
    };
    /**
     * @return {?}
     */
    StickyComponent.prototype.resetElement = /**
     * @return {?}
     */
    function () {
        this.elem.classList.remove(this.stickClass);
        Object.assign(this.elem.style, this.originalCss);
        this.reset.next(this.elem);
    };
    /**
     * @return {?}
     */
    StickyComponent.prototype.stuckElement = /**
     * @return {?}
     */
    function () {
        this.isStuck = true;
        this.elem.classList.remove(this.endStickClass);
        this.elem.classList.add(this.stickClass);
        Object.assign(this.elem.style, {
            zIndex: this.zIndex,
            position: 'fixed',
            top: this.offsetTop + 'px',
            right: 'auto',
            bottom: 'auto',
            left: this.getBoundingClientRectValue(this.elem, 'left') + 'px',
            width: this.getCssValue(this.elem, 'width')
        });
        this.activated.next(this.elem);
    };
    /**
     * @return {?}
     */
    StickyComponent.prototype.unstuckElement = /**
     * @return {?}
     */
    function () {
        this.isStuck = false;
        this.elem.classList.add(this.endStickClass);
        this.container.style.position = 'relative';
        Object.assign(this.elem.style, {
            position: 'absolute',
            top: 'auto',
            left: 'auto',
            right: this.getCssValue(this.elem, 'float') === 'right' || this.orientation === 'right' ? 0 : 'auto',
            bottom: this.offsetBottom + 'px',
            width: this.getCssValue(this.elem, 'width')
        });
        this.deactivated.next(this.elem);
    };
    /**
     * @return {?}
     */
    StickyComponent.prototype.matchMediaQuery = /**
     * @return {?}
     */
    function () {
        if (!this.mediaQuery)
            return true;
        return (window.matchMedia('(' + this.mediaQuery + ')').matches ||
            window.matchMedia(this.mediaQuery).matches);
    };
    /**
     * @return {?}
     */
    StickyComponent.prototype.sticker = /**
     * @return {?}
     */
    function () {
        // check media query
        if (this.isStuck && !this.matchMediaQuery()) {
            this.resetElement();
            return;
        }
        // detecting when a container's height changes
        var /** @type {?} */ currentContainerHeight = this.getCssNumber(this.container, 'height');
        if (currentContainerHeight !== this.containerHeight) {
            this.defineDimensions();
        }
        // check if the sticky element is above the container
        if (this.elemHeight >= currentContainerHeight) {
            return;
        }
        var /** @type {?} */ position = this.scrollbarYPos();
        // unstick
        if (this.isStuck && (position < this.containerStart || position > this.scrollFinish) || position > this.scrollFinish) {
            this.resetElement();
            if (position > this.scrollFinish)
                this.unstuckElement();
            this.isStuck = false;
        }
        else if (position > this.containerStart && position < this.scrollFinish) {
            this.stuckElement();
        }
    };
    /**
     * @return {?}
     */
    StickyComponent.prototype.scrollbarYPos = /**
     * @return {?}
     */
    function () {
        return window.pageYOffset || document.documentElement.scrollTop;
    };
    /**
     * @param {?} element
     * @param {?} property
     * @return {?}
     */
    StickyComponent.prototype.getBoundingClientRectValue = /**
     * @param {?} element
     * @param {?} property
     * @return {?}
     */
    function (element, property) {
        var /** @type {?} */ result = 0;
        if (element && element.getBoundingClientRect) {
            var /** @type {?} */ rect = element.getBoundingClientRect();
            result = (typeof rect[property] !== 'undefined') ? rect[property] : 0;
        }
        return result;
    };
    /**
     * @param {?} element
     * @param {?} property
     * @return {?}
     */
    StickyComponent.prototype.getCssValue = /**
     * @param {?} element
     * @param {?} property
     * @return {?}
     */
    function (element, property) {
        var /** @type {?} */ result = '';
        if (typeof window.getComputedStyle !== 'undefined') {
            result = window.getComputedStyle(element, '').getPropertyValue(property);
        }
        else if (typeof element.currentStyle !== 'undefined') {
            result = element.currentStyle[property];
        }
        return result;
    };
    /**
     * @param {?} element
     * @param {?} property
     * @return {?}
     */
    StickyComponent.prototype.getCssNumber = /**
     * @param {?} element
     * @param {?} property
     * @return {?}
     */
    function (element, property) {
        if (typeof element === 'undefined')
            return 0;
        return parseInt(this.getCssValue(element, property), 10) || 0;
    };
    StickyComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sticky,[sticky]',
                    template: '<ng-content></ng-content>'
                },] },
    ];
    /** @nocollapse */
    StickyComponent.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    StickyComponent.propDecorators = {
        "sticky": [{ type: Input, args: ['sticky',] },],
        "zIndex": [{ type: Input, args: ['sticky-zIndex',] },],
        "width": [{ type: Input, args: ['sticky-width',] },],
        "offsetTop": [{ type: Input, args: ['sticky-offset-top',] },],
        "offsetBottom": [{ type: Input, args: ['sticky-offset-bottom',] },],
        "start": [{ type: Input, args: ['sticky-start',] },],
        "stickClass": [{ type: Input, args: ['sticky-class',] },],
        "endStickClass": [{ type: Input, args: ['sticky-end-class',] },],
        "mediaQuery": [{ type: Input, args: ['sticky-media-query',] },],
        "parentMode": [{ type: Input, args: ['sticky-parent',] },],
        "orientation": [{ type: Input, args: ['sticky-orientation',] },],
        "activated": [{ type: Output },],
        "deactivated": [{ type: Output },],
        "reset": [{ type: Output },],
        "onChange": [{ type: HostListener, args: ['window:scroll', ['$event'],] }, { type: HostListener, args: ['window:resize', ['$event'],] }, { type: HostListener, args: ['window:orientationchange', ['$event'],] },],
    };
    return StickyComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var StickyModule = (function () {
    function StickyModule() {
    }
    StickyModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [StickyComponent],
                    exports: [StickyComponent]
                },] },
    ];
    /** @nocollapse */
    StickyModule.ctorParameters = function () { return []; };
    return StickyModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { StickyComponent, StickyModule };
//# sourceMappingURL=ng2-sticky-kit.es5.js.map
