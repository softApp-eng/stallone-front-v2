import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FuseHighlightModule } from '@fuse/components/highlight';
import { SharedModule } from 'app/shared/shared.module';
import {UserListComponent} from './list/user-list.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {UserAddComponent} from "./add/user-add.component";
import {FuseCardModule} from "../../../@fuse/components/card";
import {FuseAlertModule} from "../../../@fuse/components/alert";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {UserMdpComponent} from "./mdp/user-mdp.component";
import {MatSortModule} from "@angular/material/sort";

export const routes: Route[] = [
    {
        path     : 'list',
        component: UserListComponent,
        data: { roles: ["ADMIN"]}
    },{
        path     : 'add',
        component: UserAddComponent,
        data: { roles: ["ADMIN"]}
    },{
        path     : 'edit/:id',
        component: UserAddComponent,
        data: { roles: ["ADMIN"]}
    },{
        path     : 'mdp/:id',
        component: UserMdpComponent,
        data: { roles: ["ADMIN"]}
    }
];

@NgModule({
    declarations: [
        UserListComponent,UserAddComponent,UserMdpComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        FuseHighlightModule,
        SharedModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        //_MatMenuDirectivesModule,
        MatMenuModule,
        FuseCardModule,
        FuseAlertModule,
        MatSnackBarModule,
        MatSortModule
    ]
})
export class UserModule
{
}
