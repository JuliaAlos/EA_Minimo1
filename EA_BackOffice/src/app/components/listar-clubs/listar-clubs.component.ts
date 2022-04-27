import { Component, OnInit, ViewChild } from '@angular/core';
import { Toast, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';
import { Club } from 'src/app/models/club';
import { ClubService } from 'src/app/service/club.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-listar-clubs',
  templateUrl: './listar-clubs.component.html',
  styleUrls: ['./listar-clubs.component.css']
})
export class ListarClubsComponent implements OnInit {
  listClubs: Club[] = [];
  dataSource = new MatTableDataSource(this.listClubs);
  displayedColumns: string[] = [
    '_id',
    'name',
    'description',
    'admin',
    'subscribers',
    'categories',
    'actions',
  ];

  constructor(
    private _clubService: ClubService,
    private toastr: ToastrService
  ) { }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getClubs();
  }

  getClubs() {
    this._clubService.getClubs().subscribe(
      (data) => {
        console.log(data);
        this.listClubs = data;
        this.dataSource = new MatTableDataSource(this.listClubs);
        this.dataSource.paginator = this.paginator;

      }, (error: any) => {
        console.log(error);
      })
  }

  deleteClub(_id: any) {
    this._clubService.deleteClub(_id).subscribe((data: Object) => {
      this.toastr.error('The Club has been deleted', 'Club deleted');
      this.getClubs();
    }, (error: any) => {
      console.log(error);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
