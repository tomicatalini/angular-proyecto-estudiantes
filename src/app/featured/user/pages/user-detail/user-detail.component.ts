import { Component, OnInit } from '@angular/core';
import { User } from '../../models/models';
import { Observable } from 'rxjs';
import { UserService } from '../../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  user$ = new Observable<User | undefined>;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    const userId = Number(this.activatedRoute.snapshot.params['id']);
    
    if(Number.isNaN(userId)){
      alert(`El id ${this.activatedRoute.snapshot.params['id']} es invalido!`);
      this.router.navigate(['dashboard','user']);
    }
        
    this.user$ = this.userService.getById(userId);
  }
}
