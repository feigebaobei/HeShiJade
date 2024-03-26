import { Component, Input } from '@angular/core';
import { N, S, D, A } from 'src/types/base';
interface basicDataSourceItem {
  id: N,
  firstName: S,
  lastName: S,
  dob: D,
  gender: S,
  description: S,
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent {
  // @Input() props
  @Input() data: A
  basicDataSource: basicDataSourceItem[]
  dataTableOptions: {columns: A[]}
  // @Input() props: {[k: S]: A} = {
  //   size: 'lg', // 'mini'| 'xs' |'sm'|'md'|'lg'
  // }
  constructor() {
    this.basicDataSource = [
      {
        id: 1,
        firstName: 'Mark',
        lastName: 'Otto',
        dob: new Date(1990, 12, 1),
        gender: 'Male',
        description: 'handsome man'
      },
      {
        id: 2,
        firstName: 'Jacob',
        lastName: 'Thornton',
        gender: 'Female',
        dob: new Date(1989, 1, 1),
        description: 'interesting man'
      },
      {
        id: 3,
        firstName: 'Danni',
        lastName: 'Chen',
        gender: 'Female',
        dob: new Date(1991, 3, 1),
        description: 'pretty man',
        // expandConfig: {description: 'Danni is here'}
      },
      {
        id: 4,
        firstName: 'green',
        lastName: 'gerong',
        gender: 'Male',
        description: 'interesting man',
        dob: new Date(1991, 3, 1),
      },
    ]
    this.dataTableOptions = {
      columns: [
        {
          field: 'firstName',
          header: 'First Name',
          fieldType: 'text',
          // order: 10
        },
        {
          field: 'lastName',
          header: 'Last Name',
          fieldType: 'text',
          // order: 2
        },
        {
          field: 'gender',
          header: 'Gender',
          fieldType: 'text',
          // order: 4
        },
        {
          field: 'dob',
          header: 'Date of birth',
          fieldType: 'date',
          // order: 30
        }
      ]
    }
    // this.props/
  }
}
