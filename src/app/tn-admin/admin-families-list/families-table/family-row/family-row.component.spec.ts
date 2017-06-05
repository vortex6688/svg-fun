import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FamilyRowComponent } from './family-row.component';
import { FamilyCategoryPipe } from './family-category.pipe';
import { FamilyMoodPipe } from './family-mood.pipe';
import { FamilySizePipe } from './family-size.pipe';
import { FamilyVisibilityPipe } from './family-visibility.pipe';
import { BehaviorSubject } from 'rxjs/Rx';

describe('FamilyRowComponent', () => {
  let component: FamilyRowComponent;
  let fixture: ComponentFixture<FamilyRowComponent>;
  let collapseSubject: BehaviorSubject<boolean>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbModule ],
      declarations: [ FamilyRowComponent, FamilyCategoryPipe, FamilyMoodPipe, FamilySizePipe, FamilyVisibilityPipe ],
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

  describe('FamilyCategoryPipe', () => {
    let pipe: FamilyCategoryPipe;
    const CATEGORIES = [
      'Sans',       // 0
      'Serif',      // 1
      'Symbol',     // 2
      'Slab Serif', // 3
      'Wacky',      // 4
      'Script',     // 5
      'Decorative', // 6
    ];

    beforeEach(() => {
      pipe = new FamilyCategoryPipe();
    });

    it('should transform a valid category number to its corresponding label', () => {
      const randomCategoryState: number = Math.floor(Math.random() * 7);
      expect(pipe.transform(randomCategoryState)).toEqual(CATEGORIES[randomCategoryState]);
    });

    it('should transform an invalid category number to `Unknown`', () => {
      const outOfRangeStatusId: number = 100;
      expect(pipe.transform(outOfRangeStatusId)).toEqual('Unknown');
    });
  });

  describe('FamilyMoodPipe', () => {
    let pipe: FamilyMoodPipe;
    const MOODS = [
      'Rustic',        // 0
      'Sturdy',        // 1
      'Mechanical',    // 2
      'Industrial',    // 3
      'Informal',      // 4
      'Contemporary',  // 5
      'High-tech',     // 6
      'Futuristic',    // 7
      'Lively',        // 8
      'Delicate',      // 9
      'Classical',     // 10
      'Formal',        // 11
      'Cute',          // 12
      'Fun',           // 13
      'Technical',     // 14
      'Retro',         // 15
      'Friendly',      // 16
      'Digital',       // 17
    ];

    beforeEach(() => {
      pipe = new FamilyMoodPipe();
    });

    it('should transform a valid mood number to its corresponding label', () => {
      const randomMoodState: number = Math.floor(Math.random() * 18);
      expect(pipe.transform(randomMoodState)).toEqual(MOODS[randomMoodState]);
    });

    it('should transform an invalid mood number to `Unknown`', () => {
      const outOfRangeStatusId: number = 100;
      expect(pipe.transform(outOfRangeStatusId)).toEqual('Unknown');
    });
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

  describe('FamilyVisibilityPipe', () => {
    let pipe: FamilyVisibilityPipe;
    const VISIBLE_STATES = [
      'Inactive',    // 0
      'Staff only',  // 1
      'With link',   // 2
      'Everyone',    // 3
    ];

    beforeEach(() => {
      pipe = new FamilyVisibilityPipe();
    });

    it('should transform a valid visibility number to its corresponding label', () => {
      const randomVisibilityState: number = Math.floor(Math.random() * 4);
      expect(pipe.transform(randomVisibilityState)).toEqual(VISIBLE_STATES[randomVisibilityState]);
    });

    it('should transform an invalid visibility number to `Unknown`', () => {
      const outOfRangeStatusId: number = 10;
      expect(pipe.transform(outOfRangeStatusId)).toEqual('Unknown');
    });
  });

});
