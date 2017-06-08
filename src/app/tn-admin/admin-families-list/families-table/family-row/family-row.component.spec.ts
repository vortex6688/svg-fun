import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FamilyRowComponent } from './family-row.component';
import { FamilySizePipe } from './family-size.pipe';
import { BehaviorSubject } from 'rxjs/Rx';

describe('FamilyRowComponent', () => {
  let component: FamilyRowComponent;
  let fixture: ComponentFixture<FamilyRowComponent>;
  let collapseSubject: BehaviorSubject<boolean>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbModule ],
      declarations: [ FamilyRowComponent, FamilySizePipe ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    collapseSubject = new BehaviorSubject(true);
    fixture = TestBed.createComponent(FamilyRowComponent);
    component = fixture.componentInstance;
    component.family = {id: 1, style: [1]};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('FamilySizePipe', () => {
    let pipe: FamilySizePipe;
    const sizes = [10, 20, 30, 40];

    beforeEach(() => {
      pipe = new FamilySizePipe();
    });

    it('should transform a list of sizes and get the minimum', () => {
      expect(pipe.transform(sizes, false)).toEqual(Math.min(...sizes));
    });

    it('should transform a list of sizes and get the maximum', () => {
      expect(pipe.transform(sizes, true)).toEqual(Math.max(...sizes));
    });
  });

});
