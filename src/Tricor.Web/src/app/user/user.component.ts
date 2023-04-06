import { Component, OnInit } from '@angular/core';
import { Risk } from '../models/risk.model';
import { RiskService } from '../_services/risk.service';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

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
