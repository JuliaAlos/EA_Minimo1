import { Component, OnInit, ViewChild } from '@angular/core';
import { Toast, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-listar-users',
  templateUrl: './listar-users.component.html',
  styleUrls: ['./listar-users.component.css'],
})
export class ListarUsersComponent implements OnInit {
  listUsers: User[] = [];
  dataSource = new MatTableDataSource(this.listUsers);
  displayedColumns: string[] = [
    '_id',
    'username',
    'email',
    'full name',
    'disabled',
    'categories',
    'books',
    'events',
    'clubs',
    'chats',
    'actions',
  ];

  constructor(
    private _userService: UserService,
    private toastr: ToastrService
  ) { }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this._userService.getUsers().subscribe(
      (data) => {
        console.log(data);
        this.listUsers = data;
        this.dataSource = new MatTableDataSource(this.listUsers);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //todo passar a id
  deleteUser(id: string) {
    this._userService.deleteUser(id).subscribe(
      (data: Object) => {
        this.toastr.error(
          'El user ha estat eliminat amb exit',
          'User eliminat'
        );
        this.getUsers();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
