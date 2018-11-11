import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-complaint-view',
  templateUrl: './complaint-view.component.html',
  styleUrls: ['./complaint-view.component.css']
})
export class ComplaintViewComponent implements OnInit {

  constructor() { }

  heading = "Complaint View";

  ngOnInit() {
  }

}
