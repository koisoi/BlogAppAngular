import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable()
export class UsersService {
    constructor(private http: HttpClient) { }
    
    registerUser(
        login: string,
        password: string,
        email: string,
        gender: 'Женский' | 'Не указан' | 'Мужской',
        birthday: string | null,
        avatar: string | ArrayBuffer | null,
        interests: string,
        about: string): Promise<Number> {
        return new Promise((res: (value: number) => void, rej: (reason?: any) => void): void => {
            this.http.get(`http://localhost:3000/userList?login=${login}`)
            .subscribe((data: any) => {
                if (data[0]) return res(1);
                this.http.get(`http://localhost:3000/userList?email=${email}`)
                .subscribe((data1: any) => {
                    if (data1[0]) return res(2);
                    const body: User = {
                        login: login,
                        password: password,
                        email: email,
                        gender: gender,
                        birthday: birthday,
                        avatar: avatar,
                        interests: interests,
                        about: about,
                        posts: []
                    };
                    this.http.post<User>('http://localhost:3000/userList', body).subscribe(() => {
                        this.http.get(`http://localhost:3000/userList?login=${login}`)
                            .subscribe((data: any) => {
                                localStorage.setItem('userId', data[0].id);
                                return res(0);
                        }); 
                    });
                });
            });
        });
    }

    login(login: string, password: string): Promise<number> {
        return new Promise((res: (value: number) => void, rej: (reason?: any) => void): void => {
            this.http.get(`http://localhost:3000/userList?login=${login}&password=${password}`)
            .subscribe((data: any) => {
                if(data.length == 0) return res(0);
                else return res(data[0].id);
            });
        });
    }

    getUser(id: number): Promise<User | null> {
        return new Promise((res: (user: User | null) => void, rej: (reason?: any) => void): void => {
            this.http.get(`http://localhost:3000/userList?id=${id}`)
                .subscribe((data: any) => {
                    let user: User | null = null;
                    if (data.length != 0)
                    {
                        user = {
                        login: data[0].login,
                        email: data[0].email,
                        password: data[0].password,
                        gender: data[0].gender,
                        birthday: data[0].birthday ? data[0].birthday : null,
                        avatar: data[0].avatar ? data[0].avatar : null,
                        interests: data[0].interests ? data[0].interests : null,
                        about: data[0].about ? data[0].about : null,
                        posts: data[0].posts ? data[0].posts : []
                        }
                    };
                return res(user);
            })
        })
    }
    
    editUser(
        login: string,
        email: string,
        password: string,
        gender: 'Женский' | 'Не указан' | 'Мужской',
        birthday: string | null,
        avatar: string | ArrayBuffer | null,
        interests: string,
        about: string
    ): Promise<number> {
        return new Promise(async (res: (value: number) => void, rej: (reason?: any) => void) => {
            let user: User | null = await this.getUser(+(localStorage.getItem('userId')!));
            let loginChanged: boolean = (login != user?.login);
            let emailChanged: boolean = (email != user?.email);

            this.http.get(`http://localhost:3000/userList?login=${login}`)
            .subscribe((data: any) => {
                if (data[0] && loginChanged) return res(1);
                this.http.get(`http://localhost:3000/userList?email=${email}`)
                .subscribe((data1: any) => {
                    if (data1[0] && emailChanged) return res(2);
                    
                    const body: User = {
                        login: login,
                        email: email,
                        password: password,
                        gender: gender,
                        birthday: birthday,
                        avatar: avatar ? avatar : user?.avatar,
                        interests: interests,
                        about: about,
                        posts: user!.posts ? user!.posts : []
                    };
                    this.http.put<User>(`http://localhost:3000/userList/${localStorage.getItem('userId')}`, body).subscribe();
                    return res(0);
                });
            });
        });
    }

    deleteUser(): Promise<void> {
        return new Promise((res: () => void, rej: (reason?: any) => void) => {
            this.http.delete(`http://localhost:3000/userList/${localStorage.getItem('userId')}`).subscribe();
            localStorage.removeItem('userId');
            return res();
        });
    }

}