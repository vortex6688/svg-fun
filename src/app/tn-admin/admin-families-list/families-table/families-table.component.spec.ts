import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FamilyRowComponent } from './family-row';
import { FamiliesTableComponent } from './families-table.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('OrdersTableComponent', () => {
  let component: FamiliesTableComponent;
  let fixture: ComponentFixture<FamiliesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbModule ],
      declarations: [ FamilyRowComponent, FamiliesTableComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamiliesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set correct sort key', () => {
    const testKey = 'key';
    const nextKey = 'key2';
    component.sortBy(testKey);
    expect(component.sortKey).toEqual(`-${testKey}`, 'Expected descending key');
    component.sortBy(testKey);
    expect(component.sortKey).toEqual(`+${testKey}`, 'Expected ascending key');
    component.sortBy(nextKey);
    expect(component.sortKey).toEqual(`-${nextKey}`, 'Expected next key');
  });

  it('should manage collapseState', () => {
    expect(component.collapseState$.getValue()).toEqual(true);
    component.expandAll();
    expect(component.collapseState$.getValue()).toEqual(false);
    component.collapseAll();
    expect(component.collapseState$.getValue()).toEqual(true);
  });
});
