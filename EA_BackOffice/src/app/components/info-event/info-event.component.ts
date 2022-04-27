import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Events } from 'src/app/models/event';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-info-event',
  templateUrl: './info-event.component.html',
  styleUrls: ['./info-event.component.css']
})
export class InfoEventComponent implements OnInit {
  eventForm: FormGroup;
  listUsers: User[] = [];
  event: Events | any = null;
  eventName: string = " ";
  adminName: string = " ";
  adminEmail: string = " ";
  description: string = " ";

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
    private _eventService: EventService,
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute
  ) { 
    this.eventForm = this.fb.group({
      userId: ['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo() {
    if (this.id) {
      this._eventService.getEvent(this.id).subscribe(
        (data) => {
          console.log({ Event: data });
          this.listUsers = data.usersList;
          this.event = data;
          this.eventName = this.event.name;
          this.adminName = this.event.admin.userName;
          this.adminEmail = this.event.admin.mail;
          this.description = this.event.description;
          this.dataSource = new MatTableDataSource(this.listUsers);
          this.dataSource.paginator = this.paginator;
        },
        (error) => console.log(error)
      );
    }
  }

  deleteEvent() {
    this._eventService.deleteEvent(this.id).subscribe((data: any) => {
      this.toastr.success('Event deleted');
      this.router.navigate(['/listar-events']);
    });
  }

  joinEvent() {
    const userId = this.eventForm.get('userId')?.value;
    this._eventService.joinEvent(this.id, userId).subscribe((data: any) => {
      this.toastr.success('User joined the event');
      window.location.reload();
    });
  }

  leaveEvent(idUser: string) {
    this._eventService.leaveEvent(this.id, idUser).subscribe((data: any) => {
      this.toastr.success('User left successfully the event');
      window.location.reload();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
