import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterLink } from "@angular/router"
import { MatButton } from "@angular/material/button"
import { RouterLinkActive } from "@angular/router";
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, RouterLink, MatButton, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit, OnDestroy {
  private authListenerSubs !: Subscription;
  userIsAuthentecated =false;

  constructor(private authService : AuthService){}

  ngOnInit(){
    this.userIsAuthentecated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthentecated => {
       this.userIsAuthentecated = isAuthentecated;
    });
  }
  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }
  onLogout(){

    this.authService.logout();
  }


}
