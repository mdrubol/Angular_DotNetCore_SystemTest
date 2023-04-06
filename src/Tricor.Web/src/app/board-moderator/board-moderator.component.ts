import { Component, OnInit } from '@angular/core';
import { Risk } from '../models/risk.model';
import { RiskService } from '../_services/risk.service';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-moderator',
  templateUrl: './board-moderator.component.html'
})
export class BoardModeratorComponent implements OnInit {

  userId: number = 0;
  showList: boolean = true;

  constructor(public risktService: RiskService, private storageService: StorageService) {

    this.userId = this.storageService.getUser().user.userId;
  }
  LoadAdminData(): void {
    this.userId = -1;
  }



  ngOnInit(): void {

  }
}
