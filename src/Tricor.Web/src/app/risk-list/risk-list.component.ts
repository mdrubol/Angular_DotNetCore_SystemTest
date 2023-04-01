import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ImplicitReceiver } from '@angular/compiler';
import { Risk } from '../models/risk.model';
import { RiskService } from '../_services/risk.service';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-risk-list',
  templateUrl: './risk-list.component.html' 
})
export class RiskListComponent implements OnInit,OnChanges  {

  RiskList: Array<Risk>;
  @Input() userId:number = 0;
  @Input() showAll :boolean = false;
  @Input() showCreateNew :boolean = true;
  roles: string[] = [];
  showCheckBox:boolean = false;
  showPlusIcon:boolean = false;
  showActionIcon:boolean = true;

  constructor(public risktService: RiskService,private storageService: StorageService) {
    this.RiskList = new Array<Risk>();
    this.userId = this.showAll ? 0 : storageService.getUser().user.userId;
    
  }
  ngOnInit(): void {
    this.roles = this.storageService.getUser().user.roles;
    if (this.roles.includes("Admin")) {
      this.showCheckBox =true;
      this.showPlusIcon =false;
      this.showActionIcon =true;
      
    }
    else {
      if(this.userId==-1)
      {
        this.showCheckBox =false;       
        this.showPlusIcon =true; 
        this.showActionIcon =false;
      }
      else{
        this.showCheckBox =true;       
        this.showPlusIcon =false;
        this.showActionIcon =true;
      }
      
      //
    }

    this.getRiskList(this.userId);
    // Implement OnInit hook method here
  }
  deleteRisk(id:number)
  {
console.log(id);
    this.risktService.deleteRisk(id).subscribe(data => {
      console.log(data);
      if(data)
      {
        
        this. getRiskList(this.userId);
      }
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes,this.userId);
    this.getRiskList(this.userId);
  }
  getRiskList(userId:number) {
    this.risktService.getRisks(userId).subscribe((data) => {
      this.RiskList = data;
      console.log(data);
    });
  }

  
}
