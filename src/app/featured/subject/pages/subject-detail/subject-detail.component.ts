import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SubjectService } from '../../subject.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from '../../model/models';

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.scss']
})
export class SubjectDetailComponent implements OnInit {

  subject$ = new Observable<Subject | undefined>;

  constructor(
    private subjectService: SubjectService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    const subjectId = Number(this.activatedRoute.snapshot.params['id']);
    
    if(Number.isNaN(subjectId)){
      alert(`El id ${this.activatedRoute.snapshot.params['id']} es invalido!`);
      this.router.navigate(['dashboard','subject']);
    }
        
    this.subject$ = this.subjectService.getById(subjectId);
  }
}
