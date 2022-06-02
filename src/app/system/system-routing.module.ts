import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DeleteConfirmComponent } from "./delete-confirm/delete-confirm.component";
import { EditUserComponent } from "./edituser/edituser.component";
import { PostComponent } from "./post/post.component";
import { SystemComponent } from "./system.component";
import { UserpageComponent } from "./userpage/userpage.component";

const routes: Routes = [
    { path: '', component: SystemComponent, children: [
        { path: 'userpage', component: UserpageComponent },
        { path: 'userpage/posts/:number', component: PostComponent },
        { path: 'edit', component: EditUserComponent },
        { path: 'delete', component: DeleteConfirmComponent }
    ]},
    { path: '', redirectTo: 'userpage', pathMatch: 'full' }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemRoutingModule { }