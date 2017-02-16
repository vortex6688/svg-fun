/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TnUserComponent } from './tn-user.component';

describe('TnUserComponent', () => {
  let component: TnUserComponent;
  let fixture: ComponentFixture<TnUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TnUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TnUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
