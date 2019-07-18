import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users/users.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/dashboard', pathMatch: 'full'
  },
  {
    path: 'dashboard', component: DashboardComponent, pathMatch: 'full'
  },
  {
    path: 'users', component: UsersComponent, pathMatch: 'full'
  },
  {
    path: 'userDetails/:id', component: UserDetailComponent, pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
