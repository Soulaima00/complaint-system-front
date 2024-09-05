import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailSenderService } from 'src/Services/email-sender.service'; 
@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent {
  passwordResetForm: FormGroup;
  message: string | undefined;

  constructor(private fb: FormBuilder, private passwordResetService: EmailSenderService) {
    this.passwordResetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
       const email = this.passwordResetForm.get('email')?.value;
      const newPassword = this.passwordResetForm.get('newPassword')?.value;
  

      const subject = 'Password Reset Request';
      const text = `Hello ${email},\n\nYour password has been reset. Here is your new password: ${newPassword}\n\nPlease log in and change it as soon as possible.\n\nBest regards,\nYour Company Name`;

      this.passwordResetService.sendEmail(email, 'Password Reset', 'Your password has been reset.').subscribe(
        (response: any) => {
          this.message = response; // Affichez le message de succès
          //alert(this.message); // Affichez une alerte
        },
        (error: any) => {
          this.message = 'An error occurred. Please try again later.';
        //  alert(this.message); // Affichez une alerte d'erreur
        }
      );
     
  }
}
