import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderRowComponent } from './order-row.component';
import { License } from '../../../../tn-common/licenses/';
import { BehaviorSubject } from 'rxjs/Rx';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';

describe('OrderRowComponent', () => {
  let component: OrderRowComponent;
  let fixture: ComponentFixture<OrderRowComponent>;
  let collapseSubject: BehaviorSubject<boolean>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbModule ],
      declarations: [ OrderRowComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [ NgbModalStack, NgbActiveModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    collapseSubject = new BehaviorSubject(true);
    fixture = TestBed.createComponent(OrderRowComponent);
    component = fixture.componentInstance;
    component.order = {id: 1, licensee: {}, licenses: [] };
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

  it('should return unique families', () => {
    component.order = {
      id: 1,
      licenses: [
        { style: { family: { name: 'family' } } },
        { style: { family: { name: 'family' } } },
        { style: {} },
        { style: { family: { name: 'newFamily' } } },
        { style: { family: { name: 'thirdFamily' } } },
      ],
    };

    const expected = component.order.licenses.reduce((result, license) => {
      const name = license.style && license.style.family ? license.style.family.name : null;
      if (name && result.indexOf(name) === -1) {
        result.push(name);
      }
      return result;
    }, []);
    expect(component.families).toEqual(expected);
  });

  it('should unsubscribe on destroy', () => {
    expect(collapseSubject.observers.length).toEqual(1, 'Should subscribe initially');
    fixture.destroy();
    expect(collapseSubject.observers.length).toEqual(0, 'Should unsubscribe after destruction');
  });

});
