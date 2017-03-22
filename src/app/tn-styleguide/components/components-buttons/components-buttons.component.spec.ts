import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule }           from '@ng-bootstrap/ng-bootstrap';
import { ComponentsButtonsComponent } from './components-buttons.component';

describe('ComponentsButtonsComponent', () => {
  let component: ComponentsButtonsComponent;
  let fixture: ComponentFixture<ComponentsButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbModule.forRoot(), RouterTestingModule.withRoutes([]) ],
      declarations: [ ComponentsButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
