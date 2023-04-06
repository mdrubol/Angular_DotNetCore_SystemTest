import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html'
})
export class BoardUserComponent implements OnInit {
  userId: number = 0;

  constructor(private storageService: StorageService) {
    this.userId = this.storageService.getUser().user.userId;
  }
  ngOnInit(): void {

  }
}
