import { AfterViewInit, Component,OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { Trainee } from '../../../core/models/trainee.model';
import { TraineeService } from '../../../core/services/trainee.service';
import { CenterService } from '../../../core/services/center.service';
import { FormsModule } from '@angular/forms';
import { Center } from '../../../core/models/center.model';

@Component({
  selector: 'app-trainee-list',
  imports: [MatTableModule, MatSortModule, MatPaginatorModule,FormsModule],
  templateUrl: './trainee-list.html',
  styleUrl: './trainee-list.scss',
})
export class TraineeList implements OnInit,AfterViewInit {
  searchName = '';
  selectedCenterId = '';
  centers:Center[]=[];
@ViewChild(MatSort) sort!: MatSort;
@ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['name', 'status', 'enrollDate', 'centerId'];
  dataSource = new MatTableDataSource<Trainee>();
  constructor(private traineeService:TraineeService,private centerService:CenterService){}
  ngOnInit(): void {
    this.traineeService.getAll().subscribe(trainees=>this.dataSource.data= trainees);
    this.centerService.getAll().subscribe(centers => this.centers = centers);
    this.dataSource.filterPredicate = (data: Trainee, filter: string) => {
    const filterValues: FilterValues = JSON.parse(filter);
  
   const matchesName = data.name.toLowerCase().includes(filterValues.name.toLowerCase());
   const matchesCenter = filterValues.centerId === '' || data.centerId === +filterValues.centerId;
  
   return matchesName && matchesCenter;
};
  }
  ngAfterViewInit(): void {
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
}
applyFilters(): void {
  const filterValue: FilterValues = {
    name: this.searchName,
    centerId: this.selectedCenterId
  };
  this.dataSource.filter = JSON.stringify(filterValue);
}
}
interface FilterValues {
  name: string;
  centerId: string;
}
