import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private user: UserService
  ) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      cpassword: new FormControl('', Validators.required),
      usertype: new FormControl('', Validators.required),
      rememberme: new FormControl(false)
    });
   
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/signup';
  }

  get controls() { return this.signupForm.controls };

  private prepareSave(): User {
    return new User().deserialize({
      email: this.signupForm.controls.email.value,
      mobileNumber: this.signupForm.controls.mobile.value,
      password: this.signupForm.controls.password.value,
      userType: this.signupForm.controls.usertype.value
    });
  }

  onSignupSubmitted() {

    this.submitted = true;

    if (this.signupForm.invalid) {
      this.error = 'Missing fields';
      return false;
    }

    if (this.signupForm.controls.password.value !== this.signupForm.controls.cpassword.value) {
      this.error = 'Password mismatch';
      return false;
    }

    const body = this.prepareSave();
    
    this.user.addUser(body).subscribe(res => {
      if (res.response === true) {
        this.router.navigate(['/login']);
      } else {
        this.error = res.error || res.message;
      }
    },
    error => {
      this.error = error.statusText;
      this.router.navigate(['/login']);
    });
  }

}
