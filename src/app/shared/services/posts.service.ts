import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private http: HttpClient,
    private usersService: UsersService
  ) { }

  addPost(post: Post): Promise<void> {
    return new Promise(async (res: () => void, rej: (reason?: any) => void): Promise<void> => {
      let user: User | null = await this.usersService.getUser(+(localStorage.getItem('userId')!));
      user?.posts?.unshift(post);
      this.http.put<User>(`http://localhost:3000/userList/${localStorage.getItem('userId')}`, user).subscribe();
    });
  }

  addPs(ps: string, postId: number): Promise<void> {
    return new Promise(async (res: () => void, rej: (reason?: any) => void): Promise<void> => {
      let user: User | null = await this.usersService.getUser(+(localStorage.getItem('userId')!));
      user!.posts![postId].changed++;
      user!.posts![postId].content = user!.posts![postId].content + "\n\n" + "P.".repeat(+user!.posts![postId].changed) + "S. " + ps;
      this.http.put<User>(`http://localhost:3000/userList/${localStorage.getItem('userId')}`, user).subscribe();
    });
  }
}
