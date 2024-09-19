import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/Services/user-service.service';
import { User } from '../model/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  user: User = new User();
  constructor(
    private userService: UserServiceService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  onSubmit() {
    console.log(this.user);

    this.userService.signUp(this.user).subscribe(
      (response: any) => {
        console.log('User registered successfully', response);
        this.user = new User();

        // Display success snackbar
        this.snackBar.open('User registered successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });

        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error('Error registering user', error);

        this.snackBar.open(
          'Error registering user. Please try again.',
          'Close',
          {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          }
        );
      }
    );
  }
  ngOnInit(): void {}
}
