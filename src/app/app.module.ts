import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import {ToastrModule} from "ngx-toastr";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {CustomMatPaginatorIntl} from "./core/services/CustomMatPaginator";
import {MatRippleModule, MAT_DATE_LOCALE} from "@angular/material/core";
import { FuseScrollbarModule } from '@fuse/directives/scrollbar';
import {MatDialogModule } from '@angular/material/dialog';

import { SimpleModalComponentComponent } from './modules/simple-modal-component/simple-modal-component.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

@NgModule({
    declarations: [
        AppComponent,
        SimpleModalComponentComponent
    ],
    imports: [
        BrowserModule,
        MatDialogModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),
        ToastrModule.forRoot(), // ToastrModule added

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,

        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({}),
        FuseScrollbarModule,
        MatFormFieldModule,
        
    ],
    exports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatRippleModule,
      ],
    bootstrap   : [
        AppComponent
    ],entryComponents:[MatDialogModule],
    providers: [{
        provide: MatPaginatorIntl,
        useClass: CustomMatPaginatorIntl
    },{provide:MAT_DATE_LOCALE, useValue: 'fr-FR'}]
})
export class AppModule
{
}
