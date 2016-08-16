/// <reference path="../typings/globals/jasmine/index.d.ts" />

import {Component} from '@angular/core';
import {async, inject, addProviders, TestComponentBuilder, ComponentFixture} from '@angular/core/testing';
import {Sticky} from '../src/ng2-sticky/ng2-sticky';

export function main() {
    describe('ng2-sticky directive', () => {

        beforeEach(() => {
            addProviders([TestComponent]);
        });

        it('is defined',
            async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
                tcb.createAsync(TestComponent).then((fixture: ComponentFixture<TestComponent>) => {
                    let div = fixture.nativeElement.querySelector('div');
                    expect(Sticky).toBeDefined();
                    expect(div).toBeDefined();
                });
            }))
        );
    });
}

@Component({
    selector: 'test-component',
    template: '<div sticky sticky-offset-top="50"></div>',
    directives: [
        Sticky
    ]
})
export class TestComponent { }