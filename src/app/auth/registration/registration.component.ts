import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'app/shared/services/users.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  loginTaken: boolean = false;
  emailTaken: boolean = false;
  regSuccess: boolean = false;

  avatar: string | ArrayBuffer | null = null;
  birthday: string | null = null;

  constructor(
    private usersService: UsersService,
    private datePipe: DatePipe,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'login': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'birthday': new FormControl(null),
      'avatar': new FormControl(null),
      'gender': new FormControl('Не указан', Validators.required),
      'interests': new FormControl(null),
      'about': new FormControl(null)
    })
  }

  async onSubmit() {
    this.loginTaken = false;
    this.emailTaken = false;

    const formData = this.form.value;
    this.birthday = this.datePipe.transform(formData.birthday, 'yyyy-MM-dd');
    let regResult = await this.usersService.registerUser(
      formData.login,
      formData.password,
      formData.email,
      formData.gender,
      this.birthday,
      this.avatar,
      formData.interests,
      formData.about);
    switch (regResult) {
      case 0: 
        this.regSuccess = true;
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
}
