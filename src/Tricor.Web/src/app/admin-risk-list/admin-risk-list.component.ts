import { Component } from '@angular/core';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-admin-risk-list',
  templateUrl: './admin-risk-list.component.html'   
})
export class AdminRiskListComponent {
  userId:number=0;

  constructor(private storageService: StorageService) { 
     
  }
}
