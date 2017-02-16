/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TnFoundryComponent } from './tn-foundry.component';

describe('TnFoundryComponent', () => {
  let component: TnFoundryComponent;
  let fixture: ComponentFixture<TnFoundryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TnFoundryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TnFoundryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
