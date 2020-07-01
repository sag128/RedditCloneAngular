import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {SignupRequest} from '../signup/signup-request.payload';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  signupForm:FormGroup;
  signupRequest:SignupRequest;


  constructor(private authService:AuthService) {

    this.signupRequest =
    {
      username :'',
      email:'',
      password:''
    };

   }

  ngOnInit(): void {

    this.signupForm = new FormGroup
    ({
      username: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.email,Validators.required]),
      password: new FormControl('',Validators.required)
    });



  }

  signup()
  {

    this.signupRequest.email = this.signupForm.get('email').value;
    this.signupRequest.username = this.signupForm.get('username').value;
    this.signupRequest.password = this.signupForm.get('password').value;

    this.authService.signupService(this.signupRequest)
        .subscribe(data =>
          {
            console.log(data);
          })

  }

}
