import { Component, OnInit } from '@angular/core';
import { DataServices } from '../data.service';
import { UserReferrals } from '../../types';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private dataService: DataServices
  ) {}

  userReferral: UserReferrals | null = null

  errors: string[] = []

  id: string | null = window.location.pathname.split('/')[2]

  show: boolean = false

  ngOnInit(): void {
    try {
      this.dataService.getUserReferrals(this.id!).subscribe(
        {
            next: (user: any) => {
              this.userReferral = user
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

  showReferrals() {
    this.show = !this.show
  }

  reload(id: string) {
    try {
      this.dataService.getUserReferrals(id).subscribe(
        {
            next: (user: any) => {
              this.userReferral = user
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

}
