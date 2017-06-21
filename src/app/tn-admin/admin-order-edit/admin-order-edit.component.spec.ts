import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AdminOrderEditComponent } from './admin-order-edit.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdminOrderDetailsComponent', () => {
  let component: AdminOrderEditComponent;
  let fixture: ComponentFixture<AdminOrderEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
            imports: [ NgbModule.forRoot(), RouterTestingModule.withRoutes([]) ],
      declarations: [ AdminOrderEditComponent ],
      schemas:      [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [ NgbActiveModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
