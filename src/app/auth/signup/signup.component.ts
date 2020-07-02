import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {SignupRequest} from '../signup/signup-request.payload';
import {AuthService} from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  signupForm:FormGroup;
  signupRequest:SignupRequest;
  isError:Number;

  constructor(private authService:AuthService , private toastr: ToastrService,
    private router: Router) {
    
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
            
            if(data.toString().includes("Email"))
            {
              this.isError=1;
              console.log(data+" 1");
              this.toastr.error(data,"Error",{progressBar:true});
            }

            else if(data.toString().includes("Username"))
            {
              this.isError=2;
              console.log(data+" 2");
              this.toastr.error(data,"Error",{progressBar:true});

            }

            else if(data.toString().includes("Password"))
            {
              this.isError=3;
              console.log(data+" 3");
              this.toastr.error(data,"Error",{progressBar:true});

            }
            else{
              console.log(data);
              this.router.navigate(['/login'],{queryParams:{registered:true}})

            }

            

          },
          (error=>
            {
              this.isError=4;
              console.log("Error");
              this.toastr.error(error,"Error",{progressBar:true});
            })
      )
  }

}
