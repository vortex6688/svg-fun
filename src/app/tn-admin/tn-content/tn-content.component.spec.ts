/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TnContentComponent } from './tn-content.component';

describe('TnContentComponent', () => {
  let component: TnContentComponent;
  let fixture: ComponentFixture<TnContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TnContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TnContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
