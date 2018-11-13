import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthService) { }

  heading = "Complaint List";
  currentUser: any

  ngOnInit() {
    this.auth.getLoggedInUser();
    this.currentUser = JSON.parse(this.auth.currentUser).user.user;
  }

}
