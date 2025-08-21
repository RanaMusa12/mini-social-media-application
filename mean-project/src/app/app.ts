import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostCreate } from "./posts/post-create/post-create.component";
import { Header } from "./header/header";
import { PostsList } from "./posts/posts-list/posts-list";
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [PostCreate, Header, PostsList, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit{
  protected readonly title = signal('mean-project');
  constructor (private authService: AuthService){}

  ngOnInit(): void {
    this.authService.autoAuthUser();
  }

}
