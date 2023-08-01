import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "../featured/home/home.component";

const routes: Routes = [
    {
      path: 'home',
      component: HomeComponent,
    },
    {
        path: 'student',
        loadChildren: () => import('../featured/student/student.module').then(m => m.StudentModule)
    },
    {
        path: 'course',
        loadChildren: () => import('../featured/course/course.module').then(m => m.CourseModule)
    },
    {
        path: 'user',
        loadChildren: () => import('../featured/user/user.module').then(m => m.UserModule)
    },
    {
        path: 'subject',
        loadChildren: () => import('../featured/subject/subject.module').then(m => m.SubjectModule)
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class DashboarRoutingModule { }