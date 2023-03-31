import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
//import { EventBusService } from './_shared/event-bus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html' 
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  eventBusSub?: Subscription;

  constructor(
    public storageService: StorageService,
    private authService: AuthService,
    //private eventBusService: EventBusService
  ) {}

  ngOnInit(): void {
    
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user_token = this.storageService.getUser();
      if(user_token)
      {
        this.roles = user_token.user.roles;

        this.showAdminBoard = this.roles.includes('Admin');
        this.showModeratorBoard = this.roles.includes('User');
        this.username = user_token.user.userName;
      }
      

     
    }

    /* this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    }); */
  }

  logout(): void {
    window.sessionStorage.removeItem('auth-user');
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
