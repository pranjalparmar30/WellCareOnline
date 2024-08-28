import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { JsonserverService } from 'src/app/service/jsonserver.service';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username!: any;
  remainingTime!: any;
  private timerSubscription!: Subscription;
  showlogin: boolean = true;
  showTransaction: boolean = false;

  constructor(
    private jwt: JwtService, private router: Router, private jsonserver: JsonserverService) { }

  ngOnInit(): void {
    if (this.router.url !== '/login' && this.router.url !== '/registration') {
      const decodedToken = this.jwt.getDecoded();
      if (decodedToken) {
        this.username = decodedToken.username;
        if (this.timerSubscription) {
          this.timerSubscription.unsubscribe();
        }
        this.timerSubscription = timer(1000, 1000).subscribe(() => {
          this.remainingTime = this.jwt.calculateRemainingTime();
          if (this.remainingTime <= 0) {
            this.logout();
          }
        });
      } else {
        alert('Please Login Application');
        this.logout();
      }
    } else {
      this.username = null;
      this.remainingTime = null;
      if (this.timerSubscription) {
        this.timerSubscription.unsubscribe();
      }
    }
    if (this.jwt.isTokenValid()) {
      if (this.jwt.getDecoded().role === 'Admin') {
        this.showTransaction = true;
      }
      this.showlogin = false;
    }
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.jwt.removeToken();
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    alert('Logging Out.');
    this.router.navigate(['/login']);
  }

  onSearch(event: any): void {
    this.jsonserver.getAllUsers().subscribe(
      (data: any) => {
        let searchTextLower = event.target.value.toLowerCase();
        let datafiltered = data?.filter((user: { [s: string]: unknown; } | ArrayLike<unknown>) => {
          return Object.values(user).some(value => {
            if (value !== null && value !== undefined) {
              const valueAsString = String(value).toLowerCase();
              return valueAsString.includes(searchTextLower);
            }
            return false;
          });
        });

        console.log('Result ', datafiltered);
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

}