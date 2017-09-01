var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { StickyComponent } from '../src/ng2-sticky/ng2-sticky';
export function main() {
    describe('ng2-sticky', function () {
        beforeEach(function () {
            TestBed.configureTestingModule({
                declarations: [
                    TestComponent,
                    StickyComponent
                ],
            });
        });
        it('is defined', async(function () {
            TestBed.compileComponents().then(function () {
                var fixture = TestBed.createComponent(TestComponent);
                var stickyElement = fixture.nativeElement.querySelector('sticky');
                expect(StickyComponent).toBeDefined();
                expect(stickyElement).toBeDefined();
            });
        }));
    });
}
var TestComponent = (function () {
    function TestComponent() {
    }
    return TestComponent;
}());
TestComponent = __decorate([
    Component({
        selector: 'test-component',
        template: '<sticky [sticky-offset-top]="50"></sticky>'
    })
], TestComponent);
export { TestComponent };
//# sourceMappingURL=ng2-sticky.spec.js.map