import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-admin-user-risk-list',
  templateUrl: './admin-user-risk-list.component.html'
})
export class AdminUserRiskListComponent implements OnInit {
  userId: number = 0;

  constructor(private storageService: StorageService) {
    this.userId = this.storageService.getUser().user.userId;
  }
  ngOnInit(): void {

  }
}
