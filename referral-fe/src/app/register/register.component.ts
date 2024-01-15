import { Component, OnInit } from '@angular/core';
import { DataServices } from '../data.service';
import { Router } from '@angular/router';
import { UserInput } from '../user/models/user-input.model';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    birthdate: new FormControl(null),
    selectedValue: new FormControl(''),
    referrerUser: new FormControl(''),
  });
  submitted = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(20)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        birthdate: [null, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)],
        selectedValue: ['', Validators.required],
        referrerUser: ['']
      },
    );
  }

  errors: string[] | null = []

  constructor(
    private dataService: DataServices,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  async onSaveUser() {
    this.submitted = true;
    
    if (this.form.invalid) {
      return;
    }
      let user: UserInput = new UserInput(
        this.form.value['username'],
        this.form.value['email'],
        this.form.value['password'],
        this.form.value['birthdate'],
        this.form.value['selectedValue'],
        this.form.value['referrerUser']
      );

        try {
          this.dataService.register(user).subscribe(
            {
                next: (user) => {
                  window.localStorage.setItem('user', JSON.stringify(user))
                  this.router.navigate(['users'])
                },
                error: (err) => {
                  this.errors = []
                  window.localStorage.removeItem('user')
                  console.log(err) 
                  this.errors?.push(err.error.message)
                },
              }
        )
        } catch (err) {
          console.log(err)
          this.errors?.push('An error occurred');
        }

        this.errors = []
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
