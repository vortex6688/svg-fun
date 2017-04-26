import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsCollapseComponent } from './components-collapse.component';

describe('ComponentsCollapseComponent', () => {
  let component: ComponentsCollapseComponent;
  let fixture: ComponentFixture<ComponentsCollapseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbModule.forRoot(), RouterTestingModule.withRoutes([]) ],
      declarations: [ ComponentsCollapseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
