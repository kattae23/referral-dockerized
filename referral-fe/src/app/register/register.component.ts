import { Component, OnInit } from '@angular/core';
import { DataServices } from '../data.service';
import { Router } from '@angular/router';
import { UserInput } from '../user/models/user-input.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  ngOnInit(): void {
  }

  username: string | null = null
  email: string | null = null
  password: string | null = null
  birthdate: Date | null = null
  referrerUser: string | null = null
  selectedValue: string | null = null

  errors: string[] | null = []

  constructor(
    private dataService: DataServices,
    private router: Router,
  ) {}
  
  async onSaveUser() {
    if(
      this.username != null 
      && this.email != null 
      && this.password != null 
      && this.birthdate != null 
      && this.selectedValue != null  
      ){
      let user: UserInput = new UserInput(
          this.username, 
          this.email, 
          this.password, 
          new Date(this.birthdate), 
          this.selectedValue, 
          this.referrerUser
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
    else{
      return;
    }
  }

}
