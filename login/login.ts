import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../src/app/services/auth';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  loading = false;
  errorMessage = '';
  
  // 1. Dichiara il form qui, specificando il tipo FormGroup
  loginForm: FormGroup; 

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // 2. Inizializza il form all'interno del costruttore
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  async onSubmit(): Promise<void> {
    this.errorMessage = '';
    
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    
    this.loading = true;
    
    try {
      const { email, password } = this.loginForm.value;
      if (!email || !password) throw new Error('Compila tutti i campi.');
      
      const role = await this.authService.login(email, password);
      
      switch (role) {
        case 'admin': this.router.navigate(['/administrator-window']); break;
        case 'operator': this.router.navigate(['/operator-window']); break;
        case 'parent': this.router.navigate(['/parent-window']); break;
        default: throw new Error('Ruolo non riconosciuto.');
      }
    } catch (error: any) {
      this.errorMessage = error.message || 'Errore durante il login';
    } finally {
      this.loading = false;
    }
  }
}