import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { AdminOrdersListComponent } from './admin-orders-list.component';

describe('AdminOrdersListComponent', () => {
  let component: AdminOrdersListComponent;
  let fixture: ComponentFixture<AdminOrdersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        AdminOrdersListComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrdersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear search', () => {
    component.searchCustomer = 'Dave';
    component.searchFont = 'Benton';
    component.clearSearch();
    expect(component.searchCustomer).toBe('');
    expect(component.searchFont).toBe('');
  });
});
