import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './featured/auth/auth.component';
import { StudentComponent } from './featured/student/student.component';
import { HomeComponent } from './featured/home/home.component';
import { CourseComponent } from './featured/course/course.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'student',
        component: StudentComponent
      },
      {
        path: 'course',
        component: CourseComponent
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ]
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: []
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
