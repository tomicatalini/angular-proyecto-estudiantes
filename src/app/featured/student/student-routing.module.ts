import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StudentComponent } from "./student.component";
import { StudentDetailComponent } from "./components/student-detail/student-detail.component";

const routes: Routes = [
    {
        path: '',
        component: StudentComponent
    },
    {
        path: ':id',
        component: StudentDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudentRoutingModule {}