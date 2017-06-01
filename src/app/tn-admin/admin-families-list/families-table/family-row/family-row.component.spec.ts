import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FamilyRowComponent } from './family-row.component';
import { BehaviorSubject } from 'rxjs/Rx';

describe('FamilyRowComponent', () => {
  let component: FamilyRowComponent;
  let fixture: ComponentFixture<FamilyRowComponent>;
  let collapseSubject: BehaviorSubject<boolean>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbModule ],
      declarations: [ FamilyRowComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    collapseSubject = new BehaviorSubject(true);
    fixture = TestBed.createComponent(FamilyRowComponent);
    component = fixture.componentInstance;
    component.family = {id: 1, style: [1]};
    component.collapseSubject = collapseSubject;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle collapse on collapse events', () => {
    expect(component.isCollapsed).toBeTruthy('Should have been collapsed initially');
    collapseSubject.next(false);
    expect(component.isCollapsed).toBeFalsy('Should have been expanded after event');
  });

  it('should unsubscribe on destroy', () => {
    expect(collapseSubject.observers.length).toEqual(1, 'Should subscribe initially');
    fixture.destroy();
    expect(collapseSubject.observers.length).toEqual(0, 'Should unsubscribe after destruction');
  });
});
