import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Risk } from '../models/risk.model';
import { RiskService } from '../_services/risk.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-risk',
  templateUrl: './risk.component.html'
})
export class RiskComponent {
  risk: Risk;
  status: boolean = true;
  saveAndAddmoreShow: boolean = true;
  constructor(public riskService: RiskService, route: ActivatedRoute, private router: Router) {

    this.risk = {} as Risk;

    route.paramMap.subscribe(param => {
      if (param && param.get('id')) {
        let id: number = Number(param.get('id'));

        console.log(id);
        //let status = Boolean( param.get('status'));
        //console.log(status);
        this.getRiskById(id);
        this.saveAndAddmoreShow = false;
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
    if (this.risk && this.risk.id) {
      this.riskService.editRisk(this.risk).subscribe(data => {
        if (data)
          this.router.navigateByUrl('/admin-risk-list');
        else {
          alert("UpdateFailed");
        }
      })
    }
    else {
      this.riskService.addRisk(this.risk).subscribe(data => {
        if (data)
          //this.router.navigate(['/risk-list']);
          this.router.navigateByUrl('/admin-risk-list');
        //alert("Save Success");
        else {
          alert("Save Failed");
        }
      })
    }
  }

  saveAddmore() {
    this.riskService.addRisk(this.risk).subscribe(data => {
      if (data) {
        this.risk = {} as Risk;
        alert("Save Success");
      }
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
