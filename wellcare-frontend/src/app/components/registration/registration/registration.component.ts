import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailFormatPipe } from 'src/app/pipes/email-format.pipe';
import { JsonserverService } from 'src/app/service/jsonserver.service';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(
    private jsonserver: JsonserverService,
    private fb: FormBuilder,
    private jwt: JwtService,
    private router: Router,
    private emailFormat: EmailFormatPipe
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordStrengthValidator()]],
      confirmPassword: ['', Validators.required],
      dob: ['', [Validators.required, this.minimumAgeValidator()]],
      role: ['User', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const password = this.registrationForm.value.password;
      const confirmPassword = this.registrationForm.value.confirmPassword;
      if (password !== confirmPassword) {
        alert('Password and Confirm Password must match.');
        return;
      }
      const user = {
        username: this.registrationForm.value.username,
        email: this.registrationForm.value.email,
        password: this.registrationForm.value.password,
        dob: this.registrationForm.value.dob,
        role: this.registrationForm.value.role,
        rememberMe: false,
        darkMode: false,
        expiryTime: new Date().toISOString()
      };

      this.jsonserver.addUser(user).subscribe(
        response => {
          alert('User added successfully');
          this.registrationForm.reset();
        },
        error => {
          console.log('Error adding user:', error);
        }
      );
    } else {
      console.log('Form is invalid');
      alert('Please Fill Required Fields')
    }
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  onEmailInput(event: any): void {
    const value = event.target.value;
    const formattedEmail = this.emailFormat.transform(value);
    this.registrationForm.patchValue({ email: formattedEmail }, { emitEvent: false });
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  };

  passwordStrengthValidator() {
    return (control:any) => {
      const password = control.value;
      if (!password || password.length < 8) {
        return { 'weakPassword': true };
      }
      return null;
    };
  }

  minimumAgeValidator() {
    return (control:any) => {
      const dob = new Date(control.value);
      const today = new Date();
      const minimumAge = 14;
      const diff = today.getFullYear() - dob.getFullYear();
      if (diff < minimumAge || (diff === minimumAge && today.getMonth() < dob.getMonth())) {
        return { 'underage': true };
      }
      return null;
    };
  }
}
