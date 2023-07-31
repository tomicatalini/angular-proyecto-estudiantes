import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserTableComponent } from './pages/user-table/user-table.component';
import { UserDialogFormComponent } from './pages/user-dialog-form/user-dialog-form.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    UserComponent,
    UserTableComponent,
    UserDialogFormComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    UserComponent,
    UserTableComponent,
    UserDialogFormComponent,
    UserDetailComponent
  ]
})
export class UserModule { }
