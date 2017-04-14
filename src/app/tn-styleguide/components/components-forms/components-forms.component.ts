import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas',
'California', 'Colorado', 'Connecticut', 'Delaware', 'District Of Columbia',
'Federated States Of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii',
'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon',
'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
'South Carolina', 'South Dakota', 'Tennessee', 'Texas',
'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

@Component({
  selector: 'components-forms',
  templateUrl: './components-forms.component.html',
  styleUrls: ['./components-forms.component.scss']
})
export class ComponentsFormsComponent {
  public model: any;
  public d;

  public search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map((text) => text.length < 2 ? []
        : states.filter((v) => new RegExp(text, 'gi').test(v))
                .splice(0, 10));
}
