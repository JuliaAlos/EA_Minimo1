import { Component, OnInit, ViewChild } from '@angular/core';
import { Toast, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';
import { Events } from 'src/app/models/event';
import { EventService } from 'src/app/service/event.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-listar-events',
  templateUrl: './listar-events.component.html',
  styleUrls: ['./listar-events.component.css'],
})
export class ListarEventsComponent implements OnInit {
  listEvents: Events[] = [];
  dataSource = new MatTableDataSource(this.listEvents);
  displayedColumns: string[] = [
    '_id',
    'name',
    'description',
    'admin',
    'eventDate',
    'usersList',
    'category',
    'location',
    'actions',
  ];

  constructor(
    private _eventService: EventService,
    private toastr: ToastrService
  ) {}

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    this._eventService.getEvents().subscribe(
      (data) => {
        console.log(data);
        this.listEvents = data;
        this.dataSource = new MatTableDataSource(this.listEvents);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteEvent(name: string) {
    this._eventService.deleteEvent(name).subscribe(
      (data) => {
        this.toastr.error('Event ha estat eliminat amb exit', 'Event eliminat');
        this.getEvents();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  parseCategories(category: Category[]): String {
    if(category !== null) {
      const categories = category.map((el: Category) => el.name);
      return categories.join(', ');
    }
    else return "No categories";
  }

  parseLocation(location: { latitude: number; longitude: number; }): String {
    if(location !== null) return location.latitude + ", " + location.longitude;
    else return "No location";
  }
}
