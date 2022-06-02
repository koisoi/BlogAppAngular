import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'app/shared/models/user.model';
import { UsersService } from 'app/shared/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  loginErr: boolean = false;
  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.form = new FormGroup({
      'login': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)])
    })

    if (localStorage.getItem('userId')) {
      let user: User | null = await this.usersService.getUser(+localStorage.getItem('userId')!);
      if (user)
        this.router.navigate(['/userpage']);
    }
  }

  async onSubmit() {
    this.loginErr = false;
    const formData = this.form.value;
    await this.usersService.login(formData.login, formData.password).then((id: number) => {
      if (id)
      {
        localStorage.setItem('userId', id.toString());
        this.router.navigate(['/userpage']);
      }
      else this.loginErr = true;
    });
  }

}
