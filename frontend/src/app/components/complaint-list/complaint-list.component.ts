import { Component, OnInit } from '@angular/core';
import { ComplaintService } from '../../services/complaint.service';
import { Complaint  }  from '../../models/complaint.model';
import { AuthService }  from '../../services/auth.service';

@Component({
  selector: 'app-complaint-list',
  templateUrl: './complaint-list.component.html',
  styleUrls: ['./complaint-list.component.css']
})
export class ComplaintListComponent implements OnInit {

  constructor(private compalint: ComplaintService, private auth: AuthService) { }

  heading = "Complaint List";
  complaints: Complaint;
  error: String = '';
  currentUser:any

  ngOnInit() {

    this.auth.getLoggedInUser();
    this.currentUser =  JSON.parse(this.auth.currentUser).user.user;

    this.compalint.getComplaints().subscribe(res => {
      this.complaints = res.data;
    }, error => {
      this.error = error.statuText;
      console.log(error);
    })
  }

}
