import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '', component: RegisterComponent
  },
  {
    path: 'users', component: UsersComponent
  },
  { 
    path: 'users/:id', component: UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router){
    if(!window.localStorage.getItem('user')) this.router.navigate([''])
    if(window.localStorage.getItem('user') && window.location.pathname === '/') this.router.navigate(['users'])
  }
}
