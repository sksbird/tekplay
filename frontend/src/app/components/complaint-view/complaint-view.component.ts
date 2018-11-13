import { Component, OnInit } from '@angular/core';
import { ComplaintService } from '../../services/complaint.service';
import { Complaint  }  from '../../models/complaint.model';
import { AuthService }  from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-complaint-view',
  templateUrl: './complaint-view.component.html',
  styleUrls: ['./complaint-view.component.css']
})
export class ComplaintViewComponent implements OnInit {

  constructor(private compalint: ComplaintService, private auth: AuthService, private router: Router, private route: ActivatedRoute) { }

  heading = "Complaint View";
  complaints: Complaint;
  error: String = '';
  currentUser:any
  complaintId: any;
  today: Date = new Date();
  ngOnInit() {

    this.auth.getLoggedInUser();
    this.currentUser =  JSON.parse(this.auth.currentUser).user.user;

    this.route.params.subscribe(param => {
      this.complaintId = param['id'];
    });

    this.compalint.getComplaint(this.complaintId).subscribe(res => {
      this.complaints = res.data;
      console.log(this.complaints);
    }, error => {
      this.error = error.statuText;
      console.log(error);
    })
  }

}
