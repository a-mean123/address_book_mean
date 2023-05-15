import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  contacts: any;

  userData: any;

  constructor(private _contact: ContactService,private _user: UserService ) { }

  ngOnInit(): void {

    this.userData = this._user.getDataFromToken();

    this._contact.getMyContact( this.userData._id ).subscribe({
      next: (res)=>{
        this.contacts = res;
      },
      error: (err)=>{
        console.log(err);
      }
    })

  }


  delete(id: any){


    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
      
        this._contact.delete(id).subscribe({
          next: (res)=>{

            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )

            this.ngOnInit();

          },
          error: (err)=>{
            console.log(err);
          }
        })

      }
    })


  }

}
