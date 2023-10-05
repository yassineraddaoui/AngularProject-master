import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthentificationService} from "../../services/authentification.service";
import {AppUser} from "../../model/user.model";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

userFormGroup! : FormGroup;
errorMessage :any ;
  constructor(private fb:FormBuilder ,
              private authService : AuthentificationService,
              private router : Router )  {


  }

  ngOnInit(): void {
      this.userFormGroup=this.fb.group( {
          username : this.fb.control(""),
          password : this.fb.control("")
      });

  }

  handleLogin() {
    let username=this.userFormGroup.value.username;
    let password=this.userFormGroup.value.password;
    this.authService.login (username,password).subscribe({
          next:(appUser:AppUser)=>{
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })

            Toast.fire({
              icon: 'success',
              title: 'Signed in successfully'
            })
            this.authService.authentificateUser(appUser).subscribe({
                next:(data)=>{
                  this.router.navigateByUrl("/admin");
                }
            })
          },
          error:(err)=>{
            this.errorMessage = err;

          }
      })
  }
}
