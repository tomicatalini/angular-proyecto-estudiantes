import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './featured/auth/auth.component';
import { StudentComponent } from './featured/student/student.component';
import { HomeComponent } from './featured/home/home.component';
import { CourseComponent } from './featured/course/course.component';
import { UserComponent } from './featured/user/user.component';
import { SubjectComponent } from './featured/subject/subject.component';
import { StudentDetailComponent } from './featured/student/components/student-detail/student-detail.component';
import { CourseDetailComponent } from './featured/course/pages/course-detail/course-detail.component';
import { UserDetailComponent } from './featured/user/pages/user-detail/user-detail.component';
import { SubjectDetailComponent } from './featured/subject/pages/subject-detail/subject-detail.component';
import { LoginComponent } from './featured/auth/pages/login/login.component';

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
        children: [
          {
            path: '',
            component: StudentComponent
          },
          {
            path: ':id',
            component: StudentDetailComponent
          }
        ]
      },
      {
        path: 'course',
        children: [
          {
            path: '',
            component: CourseComponent
          },
          {
            path: ':id',
            component: CourseDetailComponent
          }
        ]
      },
      {
        path: 'user',
        children: [
          {
            path: '',
            component: UserComponent
          },
          {
            path: ':id',
            component: UserDetailComponent
          }
        ]
      },
      {
        path: 'subject',
        children: [
          {
            path: '',
            component: SubjectComponent
          },
          {
            path: ':id',
            component: SubjectDetailComponent
          }
        ]
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ]
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
