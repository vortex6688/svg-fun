import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderRowComponent } from './order-row.component';
import { OrderStatusPipe } from './order-status.pipe';
import { LicenseTypePipe } from './license-type.pipe';
import { License } from '../../../../tn-common/licenses/';
import { BehaviorSubject } from 'rxjs/Rx';

describe('OrderRowComponent', () => {
  let component: OrderRowComponent;
  let fixture: ComponentFixture<OrderRowComponent>;
  let collapseSubject: BehaviorSubject<boolean>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbModule ],
      declarations: [ OrderRowComponent, OrderStatusPipe, LicenseTypePipe ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    collapseSubject = new BehaviorSubject(true);
    fixture = TestBed.createComponent(OrderRowComponent);
    component = fixture.componentInstance;
    component.order = {id: 1};
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

  describe('OrderStatusPipe', () => {
    let pipe: OrderStatusPipe;
    const STATUSES = [
      'Pending',        // 0
      'Partially Paid', // 1
      'Paid in Full',   // 2
      'Cancelled'       // 3
    ];

    beforeEach(() => {
      pipe = new OrderStatusPipe();
    });

    it('should transform a valid order status id to its corresponding label', () => {
      const randomStatusId: number = Math.floor(Math.random() * 4);
      expect(pipe.transform(randomStatusId)).toEqual(STATUSES[randomStatusId]);
    });

    it('should transform an invalid order status id to `Unknown`', () => {
      const outOfRangeStatusId: number = 10;
      expect(pipe.transform(outOfRangeStatusId)).toEqual('Unknown');
    });

  });

  describe('LicenseTypePipe', () => {
    let pipe: LicenseTypePipe;

    const licenseMock: License = {
      id: 123,
      order: 1,
      price: '22.0000',
      price_paid: '22.0000',
      qty: 2,
      start: null,
      end: null,
      style: 286,
      years: null,
      active: true,
      license_type: 'app'
    };

    beforeEach(() => {
      pipe = new LicenseTypePipe();
    });

    it('should transform license type app to Application', () => {
      expect(pipe.transform(licenseMock)).toEqual('Application');
    });

    it('should transform license type desktop to Desktop', () => {
      licenseMock.license_type = 'desktop';
      expect(pipe.transform(licenseMock)).toEqual('Desktop');
    });

    it('should transform license type broadcast to Broadcast', () => {
      licenseMock.license_type = 'broadcast';
      expect(pipe.transform(licenseMock)).toEqual('Broadcast');
    });

    it('should transform license type epub to E-publication', () => {
      licenseMock.license_type = 'epub';
      expect(pipe.transform(licenseMock)).toEqual('E-publication');
    });

    it('should transform license type game to Game', () => {
      licenseMock.license_type = 'game';
      expect(pipe.transform(licenseMock)).toEqual('Game');
    });

    it('should transform license type server to Server', () => {
      licenseMock.license_type = 'server';
      expect(pipe.transform(licenseMock)).toEqual('Server');
    });

    it('should transform license type web to Web and show if it is hosted or self-hosted', () => {
      licenseMock.license_type = 'web';
      licenseMock.self_hosted = true;
      expect(pipe.transform(licenseMock)).toEqual('Web (self-hosted)');
      licenseMock.self_hosted = false;
      expect(pipe.transform(licenseMock)).toEqual('Web (hosted)');
    });

  });
});
