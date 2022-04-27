import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Events } from 'src/app/models/event';
import { User } from 'src/app/models/user';
import { EventService } from 'src/app/service/event.service';
import { ManagementService } from 'src/app/service/management.service';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { HttpErrorResponse } from '@angular/common/http';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-crear-event',
  templateUrl: './crear-event.component.html',
  styleUrls: ['./crear-event.component.css'],
})
export class CrearEventComponent implements OnInit {
  eventForm: FormGroup;
  title = 'Crear Event';
  name: string | null;
  users: User[] = [];
  dataSource = new MatTableDataSource(this.users);
  checkedUsers: User[] = [];
  subscribeUsers: boolean = false;
  displayedColumns: string[] = ['checkedUsers', '_id', 'userName', 'fullName'];
  categoriesList: string[] = [];
  categories = new FormControl();
  selectedCategories: string = "";
  isClose: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _eventService: EventService,
    private _userService: UserService,
    private _managementService: ManagementService,
    private aRouter: ActivatedRoute
  ) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      admin: ['', Validators.required],
      eventDate: [''],
      usersList: [''],
      //category: ['', Validators.required],
      category: [''],
      latitude: [''],
      longitude: [''],
    });

    this.name = this.aRouter.snapshot.paramMap.get('name');
  }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit(): void {

    this._userService.getUsers().subscribe(
      (userlist) => {
        console.log(userlist);
        this.users = userlist;
        
        this.editEvent();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.toastr.error(
          `Error ${error.status}, ${error.statusText}`,
          'Http error'
        );
      }
    );
    this._managementService.getCategories().subscribe(
      (categoriesJSON) => {
        for (let i = 0; i < categoriesJSON.length; i++) {
          this.categoriesList.push(categoriesJSON[i].name);
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.toastr.error(
          `Error ${error.status}, ${error.statusText}`,
          'Http error'
        );
      }
    );
  }

  addEvent() {
    //@ts-ignore
    const location: {latitude: number, longitude: number} = {latitude: this.eventForm.get('latitude')?.value, longitude: this.eventForm.get('longitude')?.value};
    const event: Events = {
      name: this.eventForm.get('name')?.value,
      description: this.eventForm.get('description')?.value,
      admin: this.eventForm.get('admin')?.value,
      eventDate: this.eventForm.get('eventDate')?.value,
      usersList: this.checkedUsers.map<User>((item) => item),
      category: this.selectedCategories,
      location: location,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const adminId = this.eventForm.get('admin')?.value;

    if (this.name !== null) {
      // Edit event
      this._eventService.editEvent(this.name, event).subscribe(
        (data) => {
          this.toastr.info('Event ha estat editat amb exit!', 'Event Editat');
          this.router.navigate(['/listar-events']);
        },
        (error) => {
          console.log(error);
          this.eventForm.reset();
        }
      );
    } else {
      // Add event
      console.log(event);
      this._eventService.addEvent(event, adminId).subscribe(
        (data) => {
          this.toastr.success('Event ha estat creat amb exit!', 'Event Creat');
          this.router.navigate(['/listar-events']);
        },
        (error) => {
          console.log(error);
          this.eventForm.reset();
        }
      );
    }
  }

  editEvent() {
    if (this.name !== null) {
      this.title = 'Editar event';
      this._eventService.getEvent(this.name).subscribe((data) => {
        const categoriesArray: Category[] = <Category[]><unknown>Array.from(data.category);
        const categoriesString: string[] = [];
        for(var i in categoriesArray) {
          categoriesString.push(categoriesArray[i].name)
        }
        this.categories.setValue(categoriesString);

        this.eventForm.setValue({
          name: data.name,
          description: data.description,
          admin: data.admin._id,
          eventDate: data.eventDate,
          usersList: data.usersList,
          category: data.category,
          latitude: data.location.latitude,
          longitude: data.location.longitude,
        });
        
        this.checkedUsers = data.usersList;
        this.users = this.users.filter((user, i) => {
          try {
            console.log(data.usersList[i].name);
            console.log(user.name);
            if(this.users[i].name !== null && user.name !== null && this.users[i].name === user.name) { console.log(false); return false;}
            else { console.log(true); return true;}
          }catch (e) {
              console.log(e);
              return true;
          }
        });
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
      });
    }
    else {
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
    }
  }

  checkBoxChange(event: any, user: User) {
    if (event.target.checked) {
      if (this.checkedUsers.includes(user)) return;

      this.checkedUsers.push(user);
    } else {
      if (!this.checkedUsers.includes(user)) return;

      const index = this.checkedUsers.indexOf(user);
      if (index > -1) this.checkedUsers.splice(index, 1);
    }
    console.log(this.checkedUsers);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  changeSelectedCategories(event: any) {
    this.isClose = false;
    if(!event) {
      this.isClose = true;
      this.selectedCategories = this.categories.value && this.categories.value.toString();
    }
  }
}
