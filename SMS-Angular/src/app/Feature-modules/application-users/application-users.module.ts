import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationUsersRoutingModule } from './application-users-routing.module';
import { AddUsersComponent } from './Components/add-users/add-users.component';
import { UsersListComponent } from './Components/users-list/users-list.component';


@NgModule({
  declarations: [
    AddUsersComponent,
    UsersListComponent
  ],
  imports: [
    CommonModule,
    ApplicationUsersRoutingModule
  ]
})
export class ApplicationUsersModule { }
