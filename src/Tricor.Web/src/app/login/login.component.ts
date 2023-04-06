import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().user.roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().user.roles;

        if (this.isLoggedIn) {
          let user_token = this.storageService.getUser();
          if (user_token) {
            this.roles = user_token.user.roles;

            this.storageService.showAdminBoard = this.roles.includes('Admin');
            this.storageService.showModeratorBoard = this.roles.includes('User');
            this.storageService.username = user_token.user.userName;
            this.storageService.userId = user_token.user.userId;
          }
        }
        if (this.roles.includes("Admin")) {
          this.router.navigateByUrl('/admin-landing-page');
        }
        else {
          this.router.navigateByUrl('/user');
        }
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
