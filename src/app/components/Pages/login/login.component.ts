import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  error:string = '';
  form!:FormGroup; 
  
  constructor(private auth: AuthService, private router: Router,private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({ 
      username: ['', Validators.required], 
      password: ['', Validators.required] 
    });
  }

  submit() {
    const { username, password } = this.form.value;
    const isValidCredentials = this.auth.login(username || '', password || '');
    if (isValidCredentials) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Invalid credentials';
    }
  }
}
