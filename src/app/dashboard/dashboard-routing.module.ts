import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "../featured/home/home.component";
import { adminGuard } from "../core/guards/admin.guard";

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
        canActivate: [adminGuard],
        loadChildren: () => import('../featured/user/user.module').then(m => m.UserModule)
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