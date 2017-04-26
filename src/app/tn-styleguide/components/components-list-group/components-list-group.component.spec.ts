import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsListGroupComponent } from './components-list-group.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('ComponentsListGroupComponent', () => {
  let component: ComponentsListGroupComponent;
  let fixture: ComponentFixture<ComponentsListGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbModule.forRoot(), RouterTestingModule.withRoutes([]), FormsModule ],
      declarations: [ ComponentsListGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsListGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
