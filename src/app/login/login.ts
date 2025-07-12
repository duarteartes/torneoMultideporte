import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login implements OnInit {

  loginForm: any;
  error: string | null = null;

  constructor(private fb: FormBuilder, private auth: Auth, private router: Router) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      usuario: [''],
      contrasena: ['']
    });
  }

  onSubmit() {
    this.error = null;
    const { usuario, contrasena } = this.loginForm.value;
    console.log('Intentando login con:', usuario, contrasena);
    if (!usuario || !contrasena) {
      this.error = 'Usuario y contraseña son obligatorios';
      return;
    }
    this.auth.login(usuario!, contrasena!).subscribe({
      next: () => this.router.navigate(['/admin']),
      error: err => {
        this.error = err.error?.message || 'Error en el login';
      }
    });
  }
}