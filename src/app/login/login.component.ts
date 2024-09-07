import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signupForm = this.fb.group({
    login: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });
  
  public isLoggedIn: boolean = false;
  
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    localStorage.clear()
  }

  login() {

    const { login, password } = this.signupForm.value;
    localStorage.clear()
    if (login && password) {
      // Use the AuthService to authenticate the user
      this.authService.authenticate(login, password).subscribe(isAuthenticated => {
        if (isAuthenticated) {
          this.isLoggedIn = true;
          const logged = localStorage.getItem("logged");
          const isAdmin = localStorage.getItem("isAdmin");

          if (logged === "1") {
            if (isAdmin === "true") {
              this.router.navigate(['/treat']);  
            } else {
              this.router.navigate(['/dashboard']);   
            }
          } else {
            Swal.fire('Notification!', 'Email ou mot de passe incorrect !', 'error');
          }
        } else {
          Swal.fire('Notification!', 'Email ou mot de passe incorrect !', 'error');
        }
      });
    } else {
      Swal.fire('Notification!', 'Veuillez remplir les champs obligatoires !', 'error');
    }
  }
}
 