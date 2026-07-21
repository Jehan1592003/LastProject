import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { Instructor } from '../../../core/models/instructor.model';
import { InstructorService } from '../../../core/services/instructor.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-instructor-list',
  imports: [MatTableModule, MatSortModule, MatPaginatorModule, RouterLink],
  templateUrl: './instructor-list.html',
  styleUrl: './instructor-list.scss',
})
export class InstructorList implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['name', 'status', 'hireDate', 'centerId', 'actions'];
  dataSource = new MatTableDataSource<Instructor>();

  constructor(private instructorService: InstructorService) {}

  ngOnInit(): void {
    this.instructorService.getAll().subscribe(instructors => this.dataSource.data = instructors);
  }

  applyFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
