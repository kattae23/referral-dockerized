import { Component, OnInit } from '@angular/core';
import { DataServices } from '../data.service';
import { User } from '../../types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(
    private dataService: DataServices,
    private router: Router
  ) {}

  users: User[] | null = null

  errors: string[] = []

  ngOnInit(): void {
    try {
      this.dataService.getUsers().subscribe(
        {
            next: (user: any) => {
              this.users = user
            },
            error: (err) => {
              this.errors = []
              console.log(err) 
              this.errors?.push(err.error.message)
            },
          }
    )
    } catch (err) {
      console.log(err)
      this.errors?.push('An error occurred');
    }
  }

  signOut() {
    window.localStorage.removeItem('user')
    this.router.navigate([''])
  }

}
