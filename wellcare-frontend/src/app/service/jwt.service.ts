import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }
  setToken(token: string) {
    localStorage.setItem("appToken", token);
  };

  getToken() {
    return localStorage.getItem("appToken");
  };
  removeToken() {
    localStorage.removeItem("appToken");
  }

  getDecoded() {
    let token: any = this.getToken();
    if (!token) return null;
    // let decodedToken: any = jwt_decode(token);
    // if (decodedToken) {
    //   return decodedToken;
    // }
    if (token) {
      return JSON.parse(token);
    }
    return null;
  };

  isTokenValid(): boolean {
    const currentUser = this.getDecoded();
    if (currentUser && currentUser.expiryTime && currentUser.rememberMe) {
      const expiryTime = new Date(currentUser.expiryTime).getTime();
      const currentTime = new Date().getTime();
      return currentTime < expiryTime;
    }
    return false;
  }

  isDarkModeEnabled(): boolean {
    const currentUser = this.getDecoded();
    return currentUser && currentUser.darkMode;
  }

  calculateRemainingTime(): number {
    const currentUser = this.getDecoded();
    if (currentUser && currentUser.expiryTime) {
      const expiryTime = new Date(currentUser.expiryTime).getTime();
      const currentTime = new Date().getTime();
      const milliRemaining =  Math.max(0, expiryTime - currentTime); // Remaining time in milliseconds
      return Math.ceil(milliRemaining / 60000);
    }
    return 0;
  }
}