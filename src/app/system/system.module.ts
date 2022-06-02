import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "app/shared/shared.module";
import { SystemRoutingModule } from "./system-routing.module";

import { UserpageComponent } from './userpage/userpage.component';
import { WallComponent } from './wall/wall.component';
import { SystemComponent } from "./system.component";
import { EditUserComponent } from './edituser/edituser.component';
import { PostComponent } from './post/post.component';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';


@NgModule({
    imports: [
      CommonModule, 
      SharedModule, 
      SystemRoutingModule
    ],
    declarations: [
      UserpageComponent,
      WallComponent,
      SystemComponent,
      EditUserComponent,
      PostComponent,
      DeleteConfirmComponent,
    ]
})
export class SystemModule {}