import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Post } from 'app/shared/models/post.model';
import { User } from 'app/shared/models/user.model';
import { PostsService } from 'app/shared/services/posts.service';
import { UsersService } from 'app/shared/services/users.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  postId: number = 0;
  user: User | null = null;
  post: Post | undefined = {} as any;
  userGetErr: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private postsService: PostsService,
    private router: Router
  ) { }

  async ngOnInit() {
    /*Проверка айди!!! */
    this.form = new FormGroup({
      'ps': new FormControl(null, Validators.required)
    });
    this.route.params.subscribe((params: Params) => {
      this.postId = params.number-1; 
    });

    if (!localStorage.getItem('userId'))
      this.errorHandler();
    
    this.user = await this.usersService.getUser(+(localStorage.getItem('userId')!));
    if (!this.user)
      this.errorHandler();
    this.post = this.user?.posts![this.postId];
    if (!this.post)
      this.errorHandler();
  }

  async onSubmit() {
    const formData = this.form.value;
    this.postsService.addPs(formData.ps, this.postId);
    this.post!.changed++;
    this.post!.content = this.post!.content + "\n\n" + "P.".repeat(+this.post!.changed) + "S. " + formData.ps;
    this.form.reset();
  }

  errorHandler() {
    this.userGetErr = true;
    window.setTimeout(() => { this.router.navigate(['/login']) }, 3000);
  }
}
