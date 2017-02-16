/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TnReportComponent } from './tn-report.component';

describe('TnReportComponent', () => {
  let component: TnReportComponent;
  let fixture: ComponentFixture<TnReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TnReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TnReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
