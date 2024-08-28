import { Component, OnInit } from '@angular/core';
import { JsonserverService } from 'src/app/service/jsonserver.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DarkModeService } from 'angular-dark-mode';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private jsonserver: JsonserverService,
    private fb: FormBuilder,
    private darkModeService: DarkModeService,
    private jwt: JwtService,
    private router: Router
    ) { }

  ngOnInit(): void {
    if (this.jwt.isTokenValid()) {
      const jwtdecoded = this.jwt.getDecoded();
      if (this.jwt.isDarkModeEnabled()) {
        this.darkModeService.enable();
      } else {
        this.darkModeService.disable();
      }
      if (jwtdecoded.role === 'User') {
        this.router.navigate(['/book']);
      } else if (jwtdecoded.role === 'Admin') {
        this.router.navigate(['/transaction']);
      }
    }
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],
      // password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
      darkMode: [false],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    const formValue = this.loginForm.value;
    this.jsonserver.login(formValue.username).subscribe((user: any) => {
      if (user) {
        if (user.password === formValue.password) {
          let expiryTime: any = new Date();
          expiryTime.setHours(expiryTime.getHours() + 2); // Add 2 hours to the current time
          expiryTime = expiryTime.toISOString();

          const updatedUser = {
            ...user,
            rememberMe: formValue.rememberMe,
            darkMode: formValue.darkMode,
            expiryTime: expiryTime
          };
          this.jsonserver.updateUser(updatedUser).subscribe(() => {
            this.jwt.setToken(JSON.stringify(updatedUser))
            if (user.role === 'User') {
              alert('Login Successful, Redirecting');
              this.router.navigate(['/book']);
            } else if (user.role === 'Admin') {
              alert('Login Successful, Redirecting');
              this.router.navigate(['/transaction']);
            }
          });
        } else {
          alert('Invalid password');
        }
      } else {
        alert('User not found, Please Register!');
        this.loginForm.reset();
      }
    }, (err: any) => {
      alert("Couldn't Login due to Unkown Error");
      this.loginForm.reset();
    });
  }

  onToggle(): void {
    this.darkModeService.toggle();
  }

  onRegister(): void {
    this.router.navigate(['/registration']);
  }

  getAllUsers(): void {
    this.jsonserver.getAllUsers().subscribe(
      (data) => {
        console.log(data)
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }
}
