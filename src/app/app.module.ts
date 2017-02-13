import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { StateService } from './state.service';
import { TopnavComponent } from './topnav/topnav.component';
import { ItemMaintenanceComponent } from './item-maintenance/item-maintenance.component';
import { ProjectionviewComponent } from './projection-view/projection-view.component';
import { RestService } from './rest.service';

import { DataTableModule, SharedModule, DropdownModule, CalendarModule, DialogModule, GrowlModule } from 'primeng/primeng';

const appRoutes: Routes = [
  { path: 'maintenance', component: ItemMaintenanceComponent },
  { path: 'projection',      component: ProjectionviewComponent },
  { path: '**', component: ItemMaintenanceComponent }
];

@NgModule({
  declarations: [
    MainComponent,
    TopnavComponent,
    ProjectionviewComponent,
    ItemMaintenanceComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    DataTableModule,
    SharedModule,
    DropdownModule,
    CalendarModule,
    DialogModule,
    GrowlModule
  ],
  providers: [StateService, RestService],
  bootstrap: [MainComponent]
})
export class AppModule { }
