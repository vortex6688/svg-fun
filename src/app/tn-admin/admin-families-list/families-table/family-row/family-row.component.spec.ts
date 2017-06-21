import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FamilyRowComponent } from './family-row.component';
import { BehaviorSubject } from 'rxjs/Rx';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';

describe('FamilyRowComponent', () => {
  let component: FamilyRowComponent;
  let fixture: ComponentFixture<FamilyRowComponent>;
  let collapseSubject: BehaviorSubject<boolean>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbModule ],
      declarations: [ FamilyRowComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [ NgbModalStack, NgbActiveModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    collapseSubject = new BehaviorSubject(true);
    fixture = TestBed.createComponent(FamilyRowComponent);
    component = fixture.componentInstance;
    component.family = {id: 1, style: [1], foundry: []};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
