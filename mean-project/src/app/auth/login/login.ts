import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  imports: [MatInputModule, MatFormFieldModule,MatCardModule,MatButtonModule, MatProgressSpinnerModule,CommonModule,FormsModule ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  constructor(public authService: AuthService){}

    isLoading = false;
    onLogin(form: NgForm){

      
      if(form.invalid){
        return;
      }
      this.authService.login(form.value.email, form.value.password);

      
    }


}
