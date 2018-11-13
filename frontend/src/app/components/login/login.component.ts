import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberme: new FormControl(false)
    });
   
    this.auth.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get controls() { return this.loginForm.controls };

  onLoginSubmitted() {

    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.auth.login(this.controls.email.value, this.controls.password.value).pipe(first()).subscribe(res => {
      console.log(res);
      if (res.response === true) {
        this.auth.setLoggedInUser(res.data);
        this.router.navigate(['/complaints/list']);
      } else {
        this.error = res.message;
        this.loading = false;
      }
    },
    error => {
      this.error = error;
      this.loading = false;     
    });
  }

}
