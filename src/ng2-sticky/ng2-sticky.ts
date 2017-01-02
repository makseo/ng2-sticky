import {Component, ElementRef, Input, Output, EventEmitter, OnInit, OnDestroy, AfterViewInit} from '@angular/core';

@Component({
    selector: 'sticky',
    template: '<ng-content></ng-content>'
})
export class StickyComponent implements OnInit, OnDestroy, AfterViewInit {

    @Input('sticky-zIndex') zIndex: number = 10;
    @Input('sticky-width') width: string = 'auto';
    @Input('sticky-offset-top') offsetTop: number = 0;
    @Input('sticky-offset-bottom') offsetBottom: number = 0;
    @Input('sticky-start') start: number = 0;
    @Input('sticky-class') stickClass: string = 'sticky';
    @Input('sticky-end-class') endStickClass: string = 'sticky-end';
    @Input('sticky-media-query') mediaQuery: string = '';
    @Input('sticky-parent') parentMode: boolean = true;
    @Input('sticky-side') absoluteSide: string = 'left';

    @Output() activated = new EventEmitter();
    @Output() deactivated = new EventEmitter();

    private onScrollBind: EventListener = this.onScroll.bind(this);
    private onResizeBind: EventListener = this.onResize.bind(this);

    private isStuck: boolean = false;
    private isDisabled: boolean = false;

    private elem: any;
    private container: any;
    private originalCss: any;

    private windowHeight: number;
    private containerHeight: number;
    private containerWidth: number;
    private elemHeight: number;
    private elemWidth: number;
    private scrollStart: number;
    private scrollFinish: number;

    constructor(private element: ElementRef) {
        this.elem = element.nativeElement;
    }

    ngOnInit(): void {
        window.addEventListener('scroll', this.onScrollBind);
        window.addEventListener('resize', this.onResizeBind);
    }

    ngAfterViewInit(): void {
        // define scroll container as parent element
        this.container = this.elem.parentNode;

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

        this.defineDimensions();

        this.sticker();
    }

    ngOnDestroy(): void {
        window.removeEventListener('scroll', this.onScrollBind);
        window.removeEventListener('resize', this.onResizeBind);
    }

    onScroll(): void {
        // console.log('Window scrolled');
        this.sticker();
    }

    onResize(): void {
        // console.log('Window resized');
        this.defineDimensions();
        if (!this.isDisabled) {
            this.fixHorizontal();
        }
        this.sticker();
    }

    defineDimensions(): void {
        // console.log('Defining dimensions');
        let containerTop: number = this.getBoundingClientRectValue(this.container, 'top');
        this.windowHeight = window.innerHeight;
        this.elemHeight = this.getCssNumber(this.elem, 'height');
        this.elemWidth = this.getCssNumber(this.elem, 'width');
        this.containerHeight = this.getCssNumber(this.container, 'height');
        this.containerWidth = this.getCssNumber(this.container, 'width');
        this.scrollStart = containerTop + this.scrollbarYPos() + this.start;
        // console.log('containerTop: ' + containerTop);
        // console.log('windowHeight: ' + this.windowHeight);
        // console.log('elemHeight: ' + this.elemHeight);
        // console.log('containerHeight: ' + this.containerHeight);
        // console.log('scrollStart: ' + this.scrollStart);
        if (this.parentMode) {
            this.scrollFinish = this.scrollStart - this.start - this.offsetTop - this.offsetBottom +
                (this.containerHeight - this.elemHeight);
        } else {
            this.scrollFinish = document.body.offsetHeight;
        }
        // console.log(this.scrollFinish);
    }

    resetElement(): void {
        // console.log('Resetting element');
        this.elem.classList.remove(this.stickClass);
        this.elem.classList.remove(this.endStickClass);
        Object.assign(this.elem.style, {
            zIndex: '',
            position: '',
            top: '',
            right: '',
            left: '',
            bottom: '',
            width: '',
        });
    }

    fixHorizontal(): void {
        if (this.isStuck) {
            let elementLeft: number;
            let containerLeft: number = this.getBoundingClientRectValue(this.container, 'left') + this.scrollbarXPos();
            if (this.absoluteSide !== 'right') {
                elementLeft = containerLeft + parseInt(this.originalCss.left, 10);
            } else {
                let elementRight: number = parseInt(this.originalCss.right, 10);
                elementLeft = containerLeft + this.containerWidth - this.elemWidth - elementRight;
            }
            this.elem.style.left = elementLeft + 'px';
            this.elem.style.right = 'auto';
        }
    }

    stuckElement(): void {
        this.isStuck = true;
        this.isDisabled = false;

        this.elem.classList.remove(this.endStickClass);
        this.elem.classList.add(this.stickClass);

        let elementLeft = this.getBoundingClientRectValue(this.elem, 'left');
        this.elem.style.zIndex = this.zIndex;
        this.elem.style.position = 'fixed';
        this.elem.style.top = this.offsetTop + 'px';
        this.elem.style.right = 'auto';
        this.elem.style.left = elementLeft + 'px';
        this.elem.style.bottom = 'auto';
        this.elem.style.width = this.width;

        this.activated.next(this.elem);
    }

    unstuckElement(): void {
        this.isStuck = false;
        this.isDisabled = false;

        this.elem.classList.add(this.endStickClass);

        this.container.style.position = 'relative';
        this.elem.style.position = 'absolute';
        this.elem.style.top = 'auto';
        this.elem.style.right = '';
        this.elem.style.left = '';
        this.elem.style.bottom = this.offsetBottom + 'px';
        this.elem.style.width = this.width;

        this.deactivated.next(this.elem);
    }

    matchMediaQuery(): any {
        if (!this.mediaQuery) {
            return true;
        }
        return (
            window.matchMedia('(' + this.mediaQuery + ')').matches ||
            window.matchMedia(this.mediaQuery).matches
        );
    }

    sticker(): void {
        // check media query
        if (!this.matchMediaQuery()) {
            if (!this.isDisabled) {
                // console.log('Media query not met, disabling functionality');
                this.resetElement();
                this.isDisabled = true;
                this.isStuck = false;
            }
            return;
        } else {
            if (this.isDisabled) {
                // console.log('Media query met, enabling functionality');
                this.isDisabled = false;
            }
        }

        // detecting when a container's height changes
        let currentContainerHeight: number = this.getCssNumber(this.container, 'height');
        if (currentContainerHeight !== this.containerHeight || this.scrollFinish < 0) {
            this.defineDimensions();
        }

        let position: number = this.scrollbarYPos();

        if (!this.isDisabled) {
            if ((this.isStuck && position < this.scrollStart) || this.scrollFinish < 0) {
                // Reset element if scroll position is higher than the sticking should start (or if scrollFinish is "invalid")
                this.resetElement();
                this.isStuck = false;
            } else {
                if (position > this.scrollFinish) {
                    // Unstick element, if the element reached the bottom (absolute position at bottom of container)
                    this.unstuckElement();
                    this.isStuck = false;
                } else {
                    // Stick element otherwise, fixed position
                    if (!this.isStuck && position > this.scrollStart && position < this.scrollFinish) {
                        this.stuckElement();
                    }
                }
            }
        }
    }

    private scrollbarXPos(): number {
        return window.pageXOffset || document.documentElement.scrollLeft;
    }

    private scrollbarYPos(): number {
        return window.pageYOffset || document.documentElement.scrollTop;
    }

    private getBoundingClientRectValue(element: any, property: string): number {
        let result = 0;
        if (element.getBoundingClientRect) {
            let rect = element.getBoundingClientRect();
            result = (typeof rect[property] !== 'undefined') ? rect[property] : 0;
        }
        return result;
    }

    private getCssValue(element: any, property: string): any {
        let result: any = '';
        let style = element.currentStyle || window.getComputedStyle(element);
        if (typeof style[property] !== 'undefined') {
            result = style[property];
        } else {
            result = style.getPropertyValue(property);
        }
        return result;
    }

    private getCssNumber(element: any, property: string): number {
        return parseInt(this.getCssValue(element, property), 10) || 0;
    }
}
