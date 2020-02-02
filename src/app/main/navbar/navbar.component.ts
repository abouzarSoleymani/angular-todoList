import { Component, OnInit } from '@angular/core';
import {AuthService} from '@app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser;
  constructor(public authService: AuthService) { }

  ngOnInit() {
  }
  logoutUser() {
    this.authService.logout().subscribe(data => console.log(data))
  }
}
