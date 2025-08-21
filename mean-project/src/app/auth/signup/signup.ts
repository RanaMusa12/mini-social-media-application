import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { NgForm, NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-signup',
  imports: [MatInputModule, MatFormFieldModule,MatCardModule,MatButtonModule, MatProgressSpinnerModule,CommonModule,FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  
  
    isLoading = false;
    constructor(public authService:AuthService){}
    onSignup(form: NgForm){

      if(form.invalid){
        return;
      }
      this.authService.createUser(form.value.email, form.value.password);
      
      
    }

}
