import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Risk } from '../models/risk.model';
import { RiskService } from '../_services/risk.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-from-admin',
  template: `<h3>Create Risk</h3>
  <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Name *</label>
      <input type="text"placeholder="Enter Risk"  required  [(ngModel)]="risk.name" class="form-control" id="exampleFormControlInput1">
    
    </div>
    <div class="mb-3">
      <label for="exampleFormControlTextarea1" class="form-label">Description</label>
      <textarea [(ngModel)]="risk.description" maxlength="5000" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      <br />
      <button type="button" (click)="clear()" class="btn btn-danger" ><i class="fa fa-close" style="font-size:12px;">&nbsp; &nbsp;Cancel</i></button>
      <span style="float: right;">
      <button (click)="saveRisk()" type="button" class="btn btn-success"><i class="fa fa-save" style="font-size:12px;">&nbsp; &nbsp; Save</i></button>  
    </span>
    </div>`
})
export class SelectFromAdminComponent {
  risk: Risk;
  status: boolean = true;
  constructor(public riskService: RiskService, route: ActivatedRoute, private router: Router) {

    this.risk = {} as Risk;

    route.paramMap.subscribe(param => {
      if (param && param.get('id')) {
        let id: number = Number(param.get('id'));

        console.log(id);
        //let status = Boolean( param.get('status'));
        //console.log(status);
        this.getRiskById(id);
      }

    });


    //this.getRiskById();
  }
  ngOnInit(): void {

  }
  clear() {
    this.risk.name = '';
    this.risk.description = '';
  }
  saveRisk() {
    this.riskService.addRisk(this.risk).subscribe(data => {
      if (data)
        //this.router.navigate(['/risk-list']);

        this.router.navigateByUrl('/user');
      //alert("Save Success");
      else {
        alert("Save Failed");
      }
    })
  }


  getRiskById(id: number) {
    this.riskService.getRiskById(id).subscribe((data) => {
      //this.RiskList = data;
      console.log(data);
      this.risk = data;
    });
  }
}
