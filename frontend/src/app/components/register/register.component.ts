import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService
  ) { 
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      cpass: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
  }

  register() {
    if (!this.registerForm.valid 
      || this.registerForm.controls.password.value !== this.registerForm.controls.cpass.value) {
        return console.log('Invalid register form');
    }

    this.userService.register(JSON.stringify(this.registerForm.value))
      .subscribe(data => {
        console.log(data);
        this.router.navigate(['/login']);
      },
      error => {
        console.log(error);
      });

    console.log(JSON.stringify(this.registerForm.value));
  }

  moveToLogin() {
    this.router.navigate(['/login']);
  }
}
