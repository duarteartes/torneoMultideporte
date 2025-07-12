import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})

export class Header {

  menuOpen = false;
  showDropdown = false;

  constructor(public auth: Auth) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.showDropdown = false;
  }

  closeMenu() {
    this.menuOpen = false;
    this.showDropdown = false;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  logout() {
    this.auth.logout();
    this.showDropdown = false;
  }
}