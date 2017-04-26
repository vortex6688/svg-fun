import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsCardComponent } from './components-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('ComponentsCardComponent', () => {
  let component: ComponentsCardComponent;
  let fixture: ComponentFixture<ComponentsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbModule.forRoot(), RouterTestingModule.withRoutes([]) ],
      declarations: [ ComponentsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
