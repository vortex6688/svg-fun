import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Family } from '../../../tn-common/families';
import { FamilyStyleRowComponent } from './family-style-row.component';

describe('FamilyStyleRowComponent', () => {
  let component: FamilyStyleRowComponent;
  let fixture: ComponentFixture<FamilyStyleRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyStyleRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyStyleRowComponent);
    component = fixture.componentInstance;
    component.style = {
      id: 1,
      name: 'Style bolder',
      style_name: 'Bold',
      family: 1,
      base_price: '22.0000',
      specimen_text: 'Text for specimen',
      support: {
        'supported language': [
          'uppercase',
          'lowercase',
        ],
      },
      default_style: false,
      foundry: 2,
      designer: 3,
      posture: 1,
      visible: 3,
      optical: 500,
      grade: 11,
      weight: 400,
      width: 500,
      tn_size: [],
      released: new Date().toString(),
      tn_weight: 300,
      tn_width: 600,
      min_recommended_size: 24,
      max_recommended_size: 100,
      isRE: false,
      recommended_function: [0, 1, 2],
      recommended_size: [400, 500],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
