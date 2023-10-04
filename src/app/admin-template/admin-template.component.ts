import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from "../services/authentification.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent implements OnInit{
  constructor(public authService : AuthentificationService, private route:Router) {

  }
  ngOnInit() {

  }

  handleLogout() {
    this.authService.logout().subscribe({
      next :(data)=>{
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
          title: 'Log out successfully'
        })
        this.route.navigateByUrl("/login");
      }
    })
  }
}
