import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {


  signupForm = this.fb.group({
    login: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });

  public isLoggedIn: boolean = false
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  login() {

    if (this.signupForm.value.login && this.signupForm.value.password) {

      if (this.signupForm.value.login == 'admin' && this.signupForm.value.password == 'admin') {
        this.isLoggedIn = true
        console.log('heyyyy')
        this.router.navigate(['/treat'])

      }
      else if (this.signupForm.value.login == 'soulaima' && this.signupForm.value.password == 'soulaima') {
        this.isLoggedIn = true
        console.log('heyyyy')
        this.router.navigate(['/dashboard'])

      } else {
        Swal.fire(
          'Notification!',
          'Email ou mot de passe incorrect !',
          'error'
        )
        this.isLoggedIn = false
      }

    } else {
      Swal.fire(
        'Notification!',
        'Veuillez remplir les champs obligatoire !',
        'error'
      )
    }



  }
}
