import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { RiskListComponent } from './risk-list/risk-list.component';
import { RiskComponent } from './risk/risk.component';
import { AdminRiskListComponent } from './admin-risk-list/admin-risk-list.component';
import { SelectFromAdminComponent } from './select-from-admin/select-from-admin.component'
const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },   
  { path: 'board-user', component: BoardUserComponent},  
  { path: 'user', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'SelectFromAdmin/:id', component: SelectFromAdminComponent },
  { path: 'admin-risk-list', component: AdminRiskListComponent },
  { path: 'risk', component: RiskComponent },
  { path: 'risk/:id', component: RiskComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
