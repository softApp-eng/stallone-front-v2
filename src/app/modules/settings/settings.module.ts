import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/shared/shared.module';
import {SettingsComponent} from "./settings.component";
import {SettingsSecurityComponent} from "./security/security.component";
import {CompteComponent} from "./compte/compte.component";
import {settingsRoutes} from "./settings.routing";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
    declarations: [
        SettingsComponent,
        SettingsSecurityComponent,
        CompteComponent
    ],
    imports: [
        RouterModule.forChild(settingsRoutes),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        FuseAlertModule,
        SharedModule,
        MatProgressSpinnerModule,
    ]
})
export class SettingsModule
{
}
