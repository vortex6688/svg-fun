import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsCardComponent } from './components-card.component';

describe('ComponentsCardComponent', () => {
  let component: ComponentsCardComponent;
  let fixture: ComponentFixture<ComponentsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
