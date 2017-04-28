import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-tables',
  templateUrl: './content-tables.component.html',
  styleUrls: ['./content-tables.component.scss']
})
export class ContentTablesComponent {
  public sortKey = '';
  public sortableTableData = [
    { no: 1, fName: 'Mark', lName: 'Otto', user: '@mdo' },
    { no: 2, fName: 'Jacob', lName: 'Thornton', user: '@fat' },
    { no: 3, fName: 'Larry', lName: 'the Bird', user: '@twitter' },
  ];

  public sortBy(key) {
    const sortSide = this.sortKey.endsWith(key) && this.sortKey.startsWith('-') ? '+' : '-';
    this.sortKey = sortSide + key;
  }
}
