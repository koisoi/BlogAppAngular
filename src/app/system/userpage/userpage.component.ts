import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/shared/models/user.model';
import { UsersService } from 'app/shared/services/users.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.scss']
})
export class UserpageComponent implements OnInit {
  loading: boolean = true;
  userGetErr: boolean = false;
  user: User | null = null;
  birthday: any = null;
  
  constructor(
    private router: Router,
    private usersService: UsersService,
    private datePipe: DatePipe) { }

  async ngOnInit() {
    if (!localStorage.getItem('userId')) {
      this.loading = false;
      this.errorHandler();
      return;
    }

    this.user = await this.usersService.getUser(+(localStorage.getItem('userId')!));
    if (!this.user) {
      this.loading = false;
      this.errorHandler();
      return;
    }

    this.birthday = this.user?.birthday;
    this.birthday = this.datePipe.transform(new Date(this.birthday), 'dd-MM-yyyy');
    
    this.loading = false;
  }

  errorHandler() {
    this.userGetErr = true;
    window.setTimeout(() => { this.router.navigate(['/login']) }, 3000);
  }

  onExit() {
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

}
