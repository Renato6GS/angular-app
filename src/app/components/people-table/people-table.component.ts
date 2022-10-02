import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { People } from 'src/app/data';
import { Person } from 'src/app/models';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-people-table',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
  ],
  templateUrl: './people-table.component.html',
  styleUrls: ['./people-table.component.css'],
})
export class PeopleTableComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'category',
    'company',
    'levelOfHappiness',
  ];
  dataSource: MatTableDataSource<Person>;

  // Todo lo que busquemos, dentro del componente HTML
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  constructor() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(People);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {}
}
