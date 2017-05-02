/* tslint:disable:max-classes-per-file */
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, BehaviorSubject } from 'rxjs';

import { TnAutoscrollService } from './tn-autoscroll.service';

describe('TnAutoscrollService', () => {
  const mockElement = {
    scrollIntoView: jasmine.createSpy('scrollIntoView'),
  };

  @Component({
    template: '<div style="height: 1000px"></div><a id="target">Target</a>',
  })
  class TestComponent {
    constructor(
      public service: TnAutoscrollService,
      public router: Router
    ) {}
  }

  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ TestComponent ],
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        TnAutoscrollService.provider(),
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should be created', async(() => {
    expect(component).toBeTruthy();
    expect(component.service).toBeTruthy();
  }));

  it('should not be triggered if there is no fragment', () => {
    const spy = spyOn(document, 'querySelector').and.returnValue(mockElement);
    component.router.navigateByUrl('').then(() => {
      expect(spy).not.toHaveBeenCalled();
      expect(mockElement.scrollIntoView).not.toHaveBeenCalled();
    });
  });

  it('it should scroll elements into view', async(() => {
    const spy = spyOn(document, 'querySelector').and.returnValue(mockElement);
    component.router.navigateByUrl('#target').then(() => {
      expect(spy).toHaveBeenCalledWith('#target');
      expect(mockElement.scrollIntoView).toHaveBeenCalled();
    });
  }));

});
