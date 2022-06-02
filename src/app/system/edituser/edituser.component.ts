import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'app/shared/models/user.model';
import { UsersService } from 'app/shared/services/users.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EditUserComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  userGetErr: boolean = false;
  loginTaken: boolean = false;
  emailTaken: boolean = false;
  saveSuccess: boolean = false;
  loading: boolean = true;

  avatar: string | ArrayBuffer | null = null;
  user: User | null = null;
  birthday: string | null = null;

  constructor(
    private usersService: UsersService,
    private datePipe: DatePipe,
    private router: Router
  ) { }

  async ngOnInit() {
    this.form = new FormGroup({
      'login': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'birthday': new FormControl(null),
      'avatar': new FormControl(null),
      'gender': new FormControl(null, Validators.required),
      'interests': new FormControl(null),
      'about': new FormControl(null)
    });

    if (!localStorage.getItem('userId')) {
      this.loading = false;
      this.errorHandler();
    }

    this.user = await this.usersService.getUser(+(localStorage.getItem('userId')!));
    if (!this.user) {
      this.loading = false;
      this.errorHandler();
    }
      
    
    this.form.get('login')?.setValue(this.user?.login);
    this.form.get('password')?.setValue(this.user?.password);
    this.form.get('email')?.setValue(this.user?.email);
    this.form.get('birthday')?.setValue(this.user?.birthday);
    this.form.get('gender')?.setValue(this.user?.gender);
    this.form.get('interests')?.setValue(this.user?.interests);
    this.form.get('about')?.setValue(this.user?.about);

    this.loading = false;
  }

  async onSubmit() {
    this.loginTaken = false;
    this.emailTaken = false;

    const formData = this.form.value;
    this.birthday = this.datePipe.transform(formData.birthday, 'yyyy-MM-dd');
    let editResult = await this.usersService.editUser(
      formData.login,
      formData.email,
      formData.password,
      formData.gender,
      this.birthday,
      this.avatar,
      formData.interests,
      formData.about
    );
    switch(editResult) {
      case 0: 
        this.saveSuccess = true;
        window.setTimeout(() => { this.router.navigate(['/userpage']) }, 1500);
        break;
      case 1:
        this.loginTaken = true;
        break;
      case 2:
        this.emailTaken = true;
        break;
    }
  }

  handleUpload(e: Event) {
    const file: File = (<HTMLInputElement>e.target).files![0];
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => this.avatar = reader.result;
  }

  errorHandler() {
    this.userGetErr = true;
    window.setTimeout(() => { this.router.navigate(['/login']) }, 3000);
  }
}
