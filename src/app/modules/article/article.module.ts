import { NgModule } from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/shared/shared.module';
import {AddComponent} from "./add/add.component";
import {FuseAlertModule} from "../../../@fuse/components/alert";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {StockComponent} from "./stock/stock.component";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";

export const routes: Route[] = [
    {
        path     : 'add',
        component: AddComponent
    },{
        path     : 'stock',
        component: StockComponent
    }
];

@NgModule({
    declarations: [
        AddComponent,StockComponent
    ],
    exports: [
    ],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTooltipModule,
        FuseCardModule,
        SharedModule,
        FuseAlertModule,
        MatSlideToggleModule,
        MatTableModule,
        MatPaginatorModule,
    ]
})
export class ArticleModule
{
}
