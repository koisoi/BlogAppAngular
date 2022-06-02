import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegistrationComponent } from "./auth/registration/registration.component";
import { SystemComponent } from "./system/system.component";

const routes: Routes = [
    { path: '', component: AuthComponent, children: [
            { path: 'login', component: LoginComponent },
            { path: 'registration', component: RegistrationComponent}
    ]},
    { path: 'system', component: SystemComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }