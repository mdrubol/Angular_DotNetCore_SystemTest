import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component'; 
import { AdminLandingPageComponent } from './admin-landing-page/admin-landing-page.component';
import { UserComponent } from './user/user.component';
import { AdminUserRiskListComponent } from './admin-user-risk-list/admin-user-risk-list.component';

//import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { RiskListComponent } from './risk-list/risk-list.component';
import { RiskComponent } from './risk/risk.component';
import { AuthInterceptor } from './_services/auth.interceptor';
import { AdminRiskListComponent } from './admin-risk-list/admin-risk-list.component';
import { SelectFromAdminComponent } from './select-from-admin/select-from-admin.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,    
    AdminLandingPageComponent,
    UserComponent,
    AdminUserRiskListComponent,
    RiskListComponent,
    RiskComponent,
    AdminRiskListComponent,
    SelectFromAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
