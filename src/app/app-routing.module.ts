import { NgModule } from "@angular/core";
import { RouterModule, Routes, PreloadAllModules } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from "./dashboard/home/home.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuardService } from "./guard/auth-guard.service";
import { NotFoundComponent } from "./not-found/not-found.component";
import { Dashboard2Component } from "./dashboard2/dashboard2.component";
import { DemoViewComponent } from "./dashboard2/demo-view/demo-view.component";
import { DemoViewOneComponent } from "./dashboard2/demo-view/demo-view-one/demo-view-one.component";
import { DemoViewTwoComponent } from "./dashboard2/demo-view/demo-view-two/demo-view-two.component";

import { LookupComponent } from "./lookup/lookup.component";
import { DriverinformationComponent } from './driverinformation/driverinformation.component';
import { ElectioninformationComponent } from './electioninformation/electioninformation.component';
import { ElectionblockcodeinformationComponent } from './electionblockcodeinformation/electionblockcodeinformation.component';
import { ElectioncontituencyinformationComponent } from './electioncontituencyinformation/electioncontituencyinformation.component';
import { ElectioncontituencypollingstationinformationComponent } from './electioncontituencypollingstationinformation/electioncontituencypollingstationinformation.component';
import { ElectioncontituencypollingstationdetailinformationComponent } from './electioncontituencypollingstationdetailinformation/electioncontituencypollingstationdetailinformation.component';
import { ElectioncontituencypollingstationresultinformationComponent } from './electioncontituencypollingstationresultinformation/electioncontituencypollingstationresultinformation.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '404', component: NotFoundComponent },
    {
        path: 'dashboard', component: DashboardComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'home', component: HomeComponent },
            { path: 'lookup', component: LookupComponent },
            { path: 'driverinformation', component: DriverinformationComponent },
            { path: 'electioninformation', component: ElectioninformationComponent },
            { path: 'electionblockcodeinformation', component: ElectionblockcodeinformationComponent },
            { path: 'electioncontituencyinformation', component: ElectioncontituencyinformationComponent },
            { path: 'electioncontituencypollingstationinformation', component: ElectioncontituencypollingstationinformationComponent },
            { path: 'electioncontituencypollingstationdetailinformation', component: ElectioncontituencypollingstationdetailinformationComponent },
            { path: 'electioncontituencypollingstationresultinformation', component: ElectioncontituencypollingstationresultinformationComponent },
            { path: '**', component: NotFoundComponent }
        ], canActivate: [AuthGuardService]
    },
    {
        path: 'view', component: Dashboard2Component,
        children: [
            { path: '', component: NotFoundComponent },
            {
                path: 'demo/:id', component: DemoViewComponent,
                children: [
                    { path: '', component: DemoViewOneComponent },
                    { path: 'DemoviewOne', component: DemoViewOneComponent },
                    { path: 'DemoviewTwo', component: DemoViewTwoComponent },
                    { path: '**', component: NotFoundComponent },
                ], canActivate: [AuthGuardService],
            },
            { path: '**', component: NotFoundComponent },
        ], canActivate: [AuthGuardService]
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: '404', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes,
        {
            useHash: true,
            preloadingStrategy: PreloadAllModules
        })],
    exports: [RouterModule],
    providers: [AuthGuardService]
})
export class AppRoutingModule { }
