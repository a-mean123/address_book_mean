import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor( private fb: FormBuilder, private _user: UserService, private _router: Router ) { 

    let controls = {
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    }

    this.loginForm = fb.group( controls );
  }

  ngOnInit(): void {
  }

  tokenFromBackend: any;

  login(){

    this._user.login( this.loginForm.value ).subscribe({
      next: (res)=>{
        
        this.tokenFromBackend = res;
        
        localStorage.setItem( 'token', this.tokenFromBackend.mytoken );
        
        this._router.navigate(['/home']);
        
      },
      error: (err)=>{

        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Email or password invalid',
          showConfirmButton: false,
          timer: 1500
        })
        
      }
    })

  }

}
