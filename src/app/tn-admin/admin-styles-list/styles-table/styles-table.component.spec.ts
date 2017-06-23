import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderByPipe } from '../../../tn-common/pipes/';
import { StyleRowComponent } from './style-row';
import { StylesTableComponent } from './styles-table.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('StylesTableComponent', () => {
  let component: StylesTableComponent;
  let fixture: ComponentFixture<StylesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbModule ],
      declarations: [ StyleRowComponent,
                      StylesTableComponent,
                      OrderByPipe, ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StylesTableComponent);
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

  it('should update page items on page update event', () => {
    const eventPayload = [1, 111];
    component.updatePageItems(eventPayload);
    expect(component.pageItems).toEqual(eventPayload, 'Expected event data.');
  });
});