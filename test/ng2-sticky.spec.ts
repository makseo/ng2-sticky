import {Component} from '@angular/core';
import {async, TestBed} from '@angular/core/testing';
import {Sticky} from '../src/ng2-sticky/ng2-sticky';

export function main() {
    describe('ng2-sticky directive', () => {

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [
                    TestComponent,
                    Sticky
                ],
            });
        });

        it('is defined', async(() => {
            TestBed.compileComponents().then(() => {
                let fixture = TestBed.createComponent(TestComponent);
                let componentInstance = fixture.componentInstance;
                let stickyElement = fixture.nativeElement.querySelector('sticky');
                expect(Sticky).toBeDefined();
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