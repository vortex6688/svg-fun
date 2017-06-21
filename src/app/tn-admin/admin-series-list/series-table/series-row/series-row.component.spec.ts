import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SeriesRowComponent } from './series-row.component';
import { BehaviorSubject } from 'rxjs/Rx';

describe('SeriesRowComponent', () => {
  let component: SeriesRowComponent;
  let fixture: ComponentFixture<SeriesRowComponent>;
  let collapseSubject: BehaviorSubject<boolean>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbModule ],
      declarations: [ SeriesRowComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    collapseSubject = new BehaviorSubject(true);
    fixture = TestBed.createComponent(SeriesRowComponent);
    component = fixture.componentInstance;
    component.series = {id: 1, family: [1], foundry: { name: 'test' }};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
