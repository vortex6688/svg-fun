/* tslint:disable:max-classes-per-file */
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';

import { TnTitleService } from './tn-title.service';

@Component({
  template: '<router-outlet></router-outlet>',
  selector: 'test'
})
class TestComponent {
  constructor(public titleService: TnTitleService, public router: Router) {}
}

@Component({
  template: '',
  selector: 'child'
})
class TestChildComponent {}

describe('TnTitleService', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestComponent, TestChildComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: '',  redirectTo: 'initial', pathMatch: 'full' },
          { path: 'initial', component: TestChildComponent, data: { title: 'Initial Title' } },
          { path: 'no-title', component: TestChildComponent,  data: { }},
          { path: 'title', component: TestChildComponent,  data: { title: 'Test Title'}},
          { path: 'no-data', component: TestChildComponent }
        ])
      ],
      providers: [ TnTitleService.provider() ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      component.router.initialNavigation();
      fixture.detectChanges();
    });
  }));

  it('should be created', async(() => {
    expect(component).toBeTruthy();
    expect(component.router.url).toEqual('/initial');
    expect(component.titleService.getTitle()).toEqual('Initial Title');
  }));

  it('should not change title if route.data is not set.', async(() => {
    component.router.navigateByUrl('/no-data').then(() => {
      fixture.detectChanges();
      expect(component.router.url).toEqual('/no-data');
      expect(component.titleService.getTitle()).toEqual('Initial Title');
    });
  }));

  it('should not change title if route.data.title is not set.', async(() => {
    return component.router.navigateByUrl('/no-title').then(() => {
      fixture.detectChanges();
      expect(component.router.url).toEqual('/no-title');
      expect(component.titleService.getTitle()).toEqual('Initial Title');
    });
  }));

  it('should change title if route.data.title is set.', async(() => {
    component.router.navigateByUrl('/title').then(() => {
      fixture.detectChanges();
      expect(component.router.url).toEqual('/title');
      expect(component.titleService.getTitle()).toEqual('Test Title');
    });
  }));
});
