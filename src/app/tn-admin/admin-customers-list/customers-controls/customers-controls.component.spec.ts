import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { initialCustomerState } from '../../../tn-common/customers';
import { CustomersControlsComponent } from './customers-controls.component';
import { DropdownOption } from '../../../tn-common/dropdown-input';

describe('CustomersControlComponent', () => {
  let component: CustomersControlsComponent;
  let fixture: ComponentFixture<CustomersControlsComponent>;
  let formBuilder: FormBuilder;
  const mockCityList = ['town', 'no town'];
  const mockCountryList = ['country', 'world'];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersControlsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [
        ReactiveFormsModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersControlsComponent);
    formBuilder = TestBed.get(FormBuilder);
    component = fixture.componentInstance;
    component.initialQuery = { ...initialCustomerState.search };
    component.locations = {
      city: mockCityList,
      country: mockCountryList,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear all the filters', () => {
    component.searchForm = formBuilder.group({
      name: 'John',
      email: 'mail@real',
      city: formBuilder.array(['town']),
      country: formBuilder.array(['world']),
    });
    component.clearFilters();
    expect(component.searchForm.value).toEqual({
      name: null,
      email: null,
      city: [],
      country: [],
    });
  });

  it('should update item lists on changes', () => {
    const initialCityList: DropdownOption[] = mockCityList.map((city) => ({
      name: city,
      selected: false,
    }));
    const initialCountryList: DropdownOption[] = mockCountryList.map((country) => ({
      name: country,
      selected: false,
    }));
    const query = {
      ...initialCustomerState.search,
      city: mockCityList,
      country: mockCountryList,
    };
    const moddedCities = [
      ...mockCityList,
      'new city',
    ];
    const moddedCountries = [
      ...mockCountryList,
      'new country',
    ];
    const cityList = moddedCities.map((city) => ({
      name: city,
      selected: query.city.indexOf(city) !== -1,
    }));
    const countryList = moddedCountries.map((country) => ({
      name: country,
      selected: query.country.indexOf(country) !== -1,
    }));
    component.ngOnChanges({ locations: { city: initialCityList, country: initialCountryList } });
    expect(component.cityList).toEqual(initialCityList);
    expect(component.countryList).toEqual(initialCountryList);

    component.locations = {
      city: moddedCities,
      country: moddedCountries,
    };
    component.initialQuery = query;
    component.ngOnChanges({ locations: { city: moddedCities, country: moddedCountries } });
    expect(component.cityList).toEqual(cityList);
    expect(component.countryList).toEqual(countryList);
  });

  it('should update item selection', () => {
    const foundryOptions: DropdownOption[] = [
      { name: 'empty', selected: true },
      { name: 'empty', selected: false },
      { name: 'empty', selected: true },
    ];
    const expected = {
      ...component.searchForm.value,
      foundry: foundryOptions.filter((foundry) => foundry.selected).map((foundry) => foundry.name),
    };
    component.updateList(foundryOptions, 'foundry');
    expect(component.searchForm.value).toEqual(expected);
  });
});
