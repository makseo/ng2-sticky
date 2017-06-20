import {Component} from '@angular/core';
import {async, TestBed} from '@angular/core/testing';
import {StickyComponent} from '../src/ng2-sticky/ng2-sticky';

export function main() {
    describe('ng2-sticky', () => {

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [
                    TestComponent,
                    StickyComponent
                ],
            });
        });

        it('is defined', async(() => {
            TestBed.compileComponents().then(() => {
                let fixture = TestBed.createComponent(TestComponent);
                let stickyElement = fixture.nativeElement.querySelector('sticky');
                expect(StickyComponent).toBeDefined();
                expect(stickyElement).toBeDefined();
            });
        }));
    });
}

@Component({
    selector: 'test-component',
    template: '<sticky [sticky-offset-top]="50"></sticky>'
})
export class TestComponent {
}