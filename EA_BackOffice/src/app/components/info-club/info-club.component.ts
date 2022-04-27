import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';
import { Club } from 'src/app/models/club';
import { User } from 'src/app/models/user';
import { ClubService } from 'src/app/service/club.service';
import { UserService } from 'src/app/service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-info-club',
  templateUrl: './info-club.component.html',
  styleUrls: ['./info-club.component.css']
})
export class InfoClubComponent implements OnInit {
  editForm: FormGroup;
  listUsers: User[] = [];
  club: Club | any = null;
  clubName: string = " ";
  adminName: string = " ";
  adminEmail: string = " ";
  description: string = " ";
  editing: boolean = false;

  id: any = " ";

  dataSource = new MatTableDataSource(this.listUsers);
  displayedColumns: string[] = [
    '_id',
    'username',
    'email',
    'actions',
  ];

  constructor(
    private fb: FormBuilder,
    private _clubService: ClubService,
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute
  ) {
    this.id = this.aRouter.snapshot.paramMap.get('id');
    this.editForm = this.fb.group({
      newName: ['', Validators.required],
      newDescription: ['', Validators.required],
    });
  }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo() {
    if (this.id) {
      this._clubService.getClub(this.id).subscribe(
        (data) => {
          console.log({ Club: data });
          this.listUsers = data.usersList;
          this.club = data;
          this.clubName = this.club.name;
          this.adminName = this.club.admin.userName;
          this.adminEmail = this.club.admin.mail;
          this.description = this.club.description;
          this.dataSource = new MatTableDataSource(this.listUsers);
          this.dataSource.paginator = this.paginator;
        },
        (error) => console.log(error)
      );
    }
  }

  deleteClub() {
    this._clubService.deleteClub(this.id).subscribe((data: any) => {
      this.toastr.success('Club deleted');
      this.router.navigate(['/listar-clubs']);
    });
  }
  editClub() {
    if (!this.editing) {
      this.editing = true;
      this.editForm.get('newName')?.setValue(this.clubName);
      this.editForm.get('newDescription')?.setValue(this.description);
    }
    else {
      this.editing = false;
      //@ts-ignore
      this.club?.name = this.editForm.get('newName')?.value;
      //@ts-ignore
      this.club?.description = this.editForm.get('newDescription')?.value;
      //@ts-ignore
      this._clubService.editClub(this.id, this.club).subscribe((data: any) => {
        this.toastr.success('Club edited');
        window.location.reload();
      });

    }
  }

  unsubscribeUser(idUser: string) {
    this._clubService.unsubscribe(this.id, idUser).subscribe((data: any) => {
      this.toastr.success('User Unsubscribed');
      window.location.reload();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
