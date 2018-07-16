import { UserService } from './../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService
  ) { 
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() {
  }

  login() {
    if (!this.loginForm.valid) {
      return console.log('Invalid login form');
    }
    
    this.userService.login(this.loginForm.value)
      .subscribe(data => {
         this.router.navigate(['/userhome']);
      },
      err => {
        console.log('login error', err);
      });
  }

  moveToRegister() {
    this.router.navigate(['/register']);
  }
}
