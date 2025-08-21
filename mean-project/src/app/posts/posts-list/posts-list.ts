import { Component , signal, Input, OnInit, OnDestroy} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { Post } from '../post.module';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from "@angular/router";
import {MatPaginatorModule} from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-posts-list',
  imports: [MatExpansionModule, CommonModule, MatButtonModule, RouterLink, MatPaginatorModule],
  templateUrl: './posts-list.html',
  styleUrl: './posts-list.css'
})
export class PostsList implements OnInit , OnDestroy{
  //  posts = [
  //   {title : 'First post', content: 'this is the first post'},
  //   {title : 'Second post', content: 'this is the second post'},
  //   {title : 'Third post', content: 'this is the third post'}
  //  ]; 
 posts : Post []=[];
  constructor (public postService : PostsService, private authService: AuthService){} 
  private postSub !: Subscription;
  totalPosts =0;
  postsPerPage = 10;
  currentPage =1;
  userIsAuthenticated = false;
  userId :string |null='';

  private authStatusSub !:Subscription;


  ngOnInit(): void {
    
    this.postService.getPosts(this.postsPerPage, this.currentPage);
    this.userId =  this.authService.getUserId();
    this.postSub = this.postService.getPostUpdatedListner()
    .subscribe((postData : {posts: Post[], postCount:number}) =>{
      this.totalPosts = postData.postCount;
      this.posts = postData.posts;
    } );
    this.userIsAuthenticated = this.authService.getIsAuth()
     this.authStatusSub= this.authService.getAuthStatusListener()
     .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId =  this.authService.getUserId();
     });
  }
  ngOnDestroy(): void {
    this.postSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  onDelete(id:string){
    this.postService.deletePost(id).subscribe(() =>{
      this.postService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  onChangedPage(pageData : PageEvent){
    this.currentPage = pageData.pageIndex +1;
    this.postsPerPage = pageData.pageSize;
     this.postService.getPosts(this.postsPerPage, this.currentPage);
  }


}
