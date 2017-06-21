import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AdminFamilySingleEditComponent } from './admin-family-single-edit.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { OrderByPipe } from '../../tn-common/pipes/';
import { Style } from '../../tn-common/styles';

describe('AdminFamilySingleEditComponent', () => {
  let component: AdminFamilySingleEditComponent;
  let fixture: ComponentFixture<AdminFamilySingleEditComponent>;
  const styleMock: Style = {
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
    foundry: [2],
    designer: [3],
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
            imports: [ NgbModule.forRoot(), RouterTestingModule.withRoutes([]) ],
      declarations: [ AdminFamilySingleEditComponent, OrderByPipe ],
      schemas:      [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [ NgbActiveModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFamilySingleEditComponent);
    component = fixture.componentInstance;
    component.family = {
      id: 123,
      name: 'Mock family',
      slug: 'mock-family',
      description: '2 real 2 describe',
      descripion_link: [{
        text: 'link text',
        url: 'link url',
      }],
      more: 'don\'t hurt me',
      category: [ 1, 2 ],
      mood: [ 3, 4 ],
      designer: [ 5, 6 ],
      foundry: [ 7, 8 ],
      posture: [ 9, 10 ],
      recommended_function: [ 11, 12 ],
      recommended_size: [ 13, 14 ],
      width: [ 15, 16 ],
      weight: [ 17, 18 ],
      tn_width: [ 19, 20 ],
      tn_weight: [ 21, 22 ],
      released: '2017-01-01',
      style: [
        { ...styleMock, id: 1, },
        { ...styleMock, id: 2, },
      ],
      default_style: 111,
      link_only_styles: [ 25, 26 ],
      canonical: 234,
      canonical_series: 234,
      series: [ 27, 28 ],
      visible: 2,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
