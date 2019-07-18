import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ChartsModule } from 'ng2-charts';


import { environment } from '../environments/environment';
import { UsersComponent } from './users/users/users.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataService } from './service/data.service';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserDetailComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ChartsModule

  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
