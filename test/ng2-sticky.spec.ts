import {Component} from '@angular/core';
import {describe, expect, it, inject, beforeEach, beforeEachProviders} from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {Sticky} from '../src/ng2-sticky/ng2-sticky';

@Component({
    selector: 'container',
    template: '<div [sticky] [sticky-offset-top]="50"></div>',
    directives: [
        Sticky
    ]
})
export class Container { }

export function main() {

    describe('ng2-sticky directive', () => {

        let tcb;

        beforeEachProviders(() => [
            TestComponentBuilder,
            Container,
            Sticky
        ]);

        beforeEach(inject([TestComponentBuilder], (_tcb: TestComponentBuilder) => {
            tcb = _tcb;
        }));

        it('is defined', () => {
            tcb.createAsync(Container).then((fixture: ComponentFixture<Sticky>) => {
                let div = fixture.nativeElement.querySelector('div');
                expect(Sticky).toBeDefined();
                expect(div).toBeDefined();
            });
        });
    });
}