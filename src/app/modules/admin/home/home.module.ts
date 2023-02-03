import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from 'app/modules/admin/home/home.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {SharedModule} from "../../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {NgxEchartsModule} from "ngx-echarts";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatTableModule} from "@angular/material/table";
import {NgApexchartsModule} from "ng-apexcharts";
import {HomeResolvers} from "./home.resolvers";
import {FuseScrollbarModule} from "../../../../@fuse/directives/scrollbar";

const exampleRoutes: Route[] = [
    {
        path     : '',
        component: HomeComponent,
        resolve  : {profile: HomeResolvers},
    }
];

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [

        RouterModule.forChild(exampleRoutes),
        MatCheckboxModule,
        MatFormFieldModule,
        MatSelectModule,
        SharedModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatMenuModule,
        MatTableModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts'),
        }),
        MatButtonToggleModule,
        NgApexchartsModule,
        FuseScrollbarModule
    ]
})
export class HomeModule
{
}
