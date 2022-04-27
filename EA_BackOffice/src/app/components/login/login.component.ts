import { HttpErrorResponse } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserSignin, UserSignup } from 'src/app/models/auth';
import { AuthService } from 'src/app/service/auth.service';
import { ManagementService } from 'src/app/service/management.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {
  signInForm: FormGroup;
  formGroup1: FormGroup;
  formGroup2: FormGroup;
  formGroup3: FormGroup;
  isClose: boolean = false;
  roles = new FormControl();
  selectedRoles: string = "";
  roleList: string[] = ["READER", "WRITER", "ADMIN"];
  categoriesList: string[] = [];
  categories = new FormControl();
  selectedCategories: string = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _authService: AuthService,
    private _managementService: ManagementService,
  ) {
    this.signInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.formGroup1 = this.fb.group({
      username: ['', Validators.required],
      mail: ['', Validators.required]
    });
    this.formGroup2 = this.fb.group({
      name: ['', Validators.required],
      birthDate: ['', Validators.required]
    });
    this.formGroup3 = this.fb.group({
      password: ['', Validators.required],
      confirmPsw: ['', Validators.required]
    });
    this.roles.setValue(["READER"]);
  }

  ngOnInit(): void {
    this.signInForm.get('username')?.setValue(localStorage.getItem('userName'));
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

  login() {
    const user: UserSignin = {
      password: this.signInForm.get('password')?.value,
      userName: this.signInForm.get('username')?.value,
    };
    this._authService.signin(user).subscribe(
      (data: any) => {
        this.toastr.info('Dale wey!', 'Signin');
        localStorage.setItem('token', data.token);
        console.log(data);
        this.router.navigate(['/home/']);
      },
      (error) => {
        console.log(error);
        this.signInForm.reset();
      }
    );
  }

  register() {
    console.log(this.selectedCategories)
    console.log(this.selectedCategories.split(','))
    const user: UserSignup = {
      userName: this.formGroup1.get('username')?.value,
      mail: this.formGroup1.get('mail')?.value,
      name: this.formGroup2.get('name')?.value,
      birthDate: this.formGroup2.get('birthDate')?.value,
      password: this.formGroup3.get('password')?.value,
      role: this.selectedRoles.split(','),
      category: this.selectedCategories.split(','),
    };

    this._authService.signup(user).subscribe(
      (data: any) => {
        this.toastr.info('Dale wey!', 'Signin');
        localStorage.setItem('token', data.token);
        console.log(data);
        this.router.navigate(['/home/']);
      },
      (error) => {
        console.log(error);
        this.signInForm.reset();
      }
    );
  }

  changeSelectedRoles(event: any) {
    this.isClose = false;
    this.selectedRoles = this.roles.value && this.roles.value.toString();
    console.log(this.selectedRoles.toString())
    if (!event) {
      this.isClose = true;
      this.selectedRoles = this.roles.value && this.roles.value.toString();
    }
  }
  changeSelectedCategories(event: any) {
    this.isClose = false;
    if (!event) {
      this.isClose = true;
      this.selectedCategories = this.categories.value && this.categories.value.toString();
    }
  }

}
