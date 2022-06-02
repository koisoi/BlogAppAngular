import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'app/shared/models/post.model';
import { User } from 'app/shared/models/user.model';
import { PostsService } from 'app/shared/services/posts.service';
import { UsersService } from 'app/shared/services/users.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  user: User | null = null;
  posts: Post[] = [];
  postsReverse: boolean = false;

  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
    private datePipe: DatePipe
  ) { }

  async ngOnInit() {
    this.form = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'content': new FormControl(null, Validators.required)
    });

    this.user = await this.usersService.getUser(+(localStorage.getItem('userId')!));
    this.posts = this.user?.posts ? this.user?.posts : [];
  }

  onSubmit() {
    let post: Post = {} as any;
    const formData = this.form.value;

    post.title = formData.title;
    post.content = formData.content;
    post.date = this.datePipe.transform(new Date(), 'HH:mm dd-MM-yyyy');
    post.changed = 0;
    
    this.postsService.addPost(post);
    if (this.postsReverse)
      this.posts.push(post);
    else this.posts.unshift(post);
    this.form.reset();
  }

  onChange(e: Event) {
    const newToOld: boolean = !(+((<HTMLSelectElement>e.target)?.value));
    if (newToOld) {
      if (this.postsReverse)
        this.posts.reverse();
      this.postsReverse = false;
    }
    else {
      if (!this.postsReverse)
        this.posts.reverse();
      this.postsReverse = true;
    }
  }
}
