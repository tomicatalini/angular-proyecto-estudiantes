import { Component, OnInit } from '@angular/core';
import { Course } from '../../model/model';
import { Observable } from 'rxjs';
import { CourseService } from '../../course.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {

  course$ = new Observable<Course | undefined>;

  constructor(
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    const courseId = Number(this.activatedRoute.snapshot.params['id']);
    
    if(Number.isNaN(courseId)){
      alert(`El id ${this.activatedRoute.snapshot.params['id']} es invalido!`);
      this.router.navigate(['dashboard','course']);
    }
        
    this.course$ = this.courseService.getById(courseId);
  }
}
