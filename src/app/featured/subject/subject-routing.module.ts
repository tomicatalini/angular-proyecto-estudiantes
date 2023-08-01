import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectComponent } from './subject.component';
import { SubjectDetailComponent } from './pages/subject-detail/subject-detail.component';

const routes: Routes = [
  {
    path: '',
    component: SubjectComponent
  },
  {
      path: ':id',
      component: SubjectDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }
