import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {

  username: string;

  constructor(
    private router: Router,
    private userServie: UserService
  ) { 
    this.userServie.user()
      .subscribe(data => {
        this.addName(data);
      },
      err => {
        console.log('user error', err);
        this.router.navigate(['/login']);
      });
  }

  addName(data) {
    this.username = data.username;
  }

  ngOnInit() {

  }

  logout() {
    this.userServie.logout()
      .subscribe(data => {
        this.router.navigate(['/login']);
      },
      err => {
        console.log('logout error', err);
      });
  }
}
