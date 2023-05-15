import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup;

  constructor( private fb: FormBuilder, private _user: UserService, private _router: Router ) { 

    let controls = {
      name: new FormControl('', [
        Validators.required
      ]),
      lastname: new FormControl( '', [
        Validators.required
      ] ),
      email: new FormControl( '' , [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl( '', [
        Validators.required
      ] )
    }

    this.registerForm = fb.group(controls);

  }

  ngOnInit(): void {
  }


  register(){

    this._user.register( this.registerForm.value ).subscribe({

      next: (res)=>{

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your account has been created',
          showConfirmButton: false,
          timer: 1500
        })

        this._router.navigate(['/login']);

      },
      error: (err)=>{

        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Please try again',
          showConfirmButton: false,
          timer: 1500
        })

      }

    })


  }

}
