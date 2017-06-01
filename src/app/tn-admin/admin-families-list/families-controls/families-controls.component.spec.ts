import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FamilySearch, initialFamilyState } from '../../../tn-common/families';
import { FamiliesControlsComponent } from './families-controls.component';

describe('FamiliesControlComponent', () => {
  let component: FamiliesControlsComponent;
  let fixture: ComponentFixture<FamiliesControlsComponent>;
  const defaultQuery: FamilySearch = initialFamilyState.search.query;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamiliesControlsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [
        ReactiveFormsModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamiliesControlsComponent);
    component = fixture.componentInstance;
    component.initialQuery = {
      ...defaultQuery,
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
