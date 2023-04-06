import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminUserRiskListComponent } from './admin-user-risk-list/admin-user-risk-list.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { AdminLandingPageComponent } from './admin-landing-page/admin-landing-page.component';
import { RiskListComponent } from './risk-list/risk-list.component';
import { RiskComponent } from './risk/risk.component';
import { AdminRiskListComponent } from './admin-risk-list/admin-risk-list.component';
import { SelectFromAdminComponent } from './select-from-admin/select-from-admin.component'
const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin-user-risk-list', component: AdminUserRiskListComponent },
  { path: 'user', component: BoardModeratorComponent },
  { path: 'admin-landing-page', component: AdminLandingPageComponent },
  { path: 'SelectFromAdmin/:id', component: SelectFromAdminComponent },
  { path: 'admin-risk-list', component: AdminRiskListComponent },
  { path: 'risk', component: RiskComponent },
  { path: 'risk/:id', component: RiskComponent },
  { path: 'risk/:id/:numRec', component: RiskComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
