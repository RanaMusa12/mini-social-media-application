import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { PostsList } from './posts/posts-list/posts-list';
import { PostCreate } from './posts/post-create/post-create.component';
import { Login } from './auth/login/login';
import { Signup } from './auth/signup/signup';
import { AuthGuard } from './auth/auth.guard';
export const routes: Routes = [

    {
        path:'',
        component: PostsList
    },
    {
        path: 'create',
        component: PostCreate,
        canActivate: [AuthGuard]
    },
    {
        path: 'edit/:postId',
        component: PostCreate,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'signup',
        component: Signup
    }
];
