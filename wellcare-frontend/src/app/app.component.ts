import { Component, OnInit } from '@angular/core';
import { JwtService } from './service/jwt.service';
import { Router } from '@angular/router';
import { DarkModeService } from 'angular-dark-mode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'learnearn';
  constructor(private jwt: JwtService, private router: Router, private darkModeService: DarkModeService) { }

  ngOnInit(): void {
    this.darkModeService.disable();
  }
}