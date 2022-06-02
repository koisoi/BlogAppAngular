import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/shared/models/user.model';
import { UsersService } from 'app/shared/services/users.service';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss']
})
export class DeleteConfirmComponent implements OnInit {
  deleteDone: boolean = false;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  async ngOnInit() {
    if (!localStorage.getItem('userId'))
      this.router.navigate(['/login']);
    
    let user: User | null = await this.usersService.getUser(+localStorage.getItem('userId')!);
    if (!user)
      this.router.navigate(['/login']);
  }

  async onConfirm() {
    await this.usersService.deleteUser();
    this.deleteDone = true;
    window.setTimeout(() => { this.router.navigate(['/login']) }, 2000);
  }
}
