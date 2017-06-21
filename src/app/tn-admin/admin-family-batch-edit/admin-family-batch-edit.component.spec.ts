import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AdminFamilyBatchEditComponent } from './admin-family-batch-edit.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { OrderByPipe } from '../../tn-common/pipes/';
import { Style } from '../../tn-common/styles';

describe('AdminOrderDetailsComponent', () => {
  let component: AdminFamilyBatchEditComponent;
  let fixture: ComponentFixture<AdminFamilyBatchEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbModule.forRoot(), RouterTestingModule.withRoutes([]) ],
      declarations: [ AdminFamilyBatchEditComponent, OrderByPipe ],
      schemas:      [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [ NgbActiveModal ]
    })
    .compileComponents();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
