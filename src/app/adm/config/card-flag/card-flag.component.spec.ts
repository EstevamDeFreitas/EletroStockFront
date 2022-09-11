/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CardFlagComponent } from './card-flag.component';

describe('CardFlagComponent', () => {
  let component: CardFlagComponent;
  let fixture: ComponentFixture<CardFlagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFlagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFlagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
