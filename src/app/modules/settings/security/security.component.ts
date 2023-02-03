import {ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {FuseAlertType} from "../../../../@fuse/components/alert";
import {SettingsService} from "../settings.service";
import {fuseAnimations} from "../../../../@fuse/animations";
import {AuthService} from "../../../core/auth/auth.service";
import {finalize} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
    selector       : 'settings-security',
    templateUrl    : './security.component.html',
    encapsulation  : ViewEncapsulation.None,
   // changeDetection: ChangeDetectionStrategy.OnPush,
    animations   : fuseAnimations
})
export class SettingsSecurityComponent implements OnInit
{
    @ViewChild('securityNgForm') securityNgForm: NgForm;
     securityForm: FormGroup;
    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _settingsService: SettingsService,
        private _authService: AuthService,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.securityForm = this._formBuilder.group({
            currentPassword  : ['',Validators.required],
            newPassword      : ['',Validators.required],
            confirmation     : ['', Validators.required]
        },{
        validator: this.mustMatch('newPassword', 'confirmation')
    });
    }

    save(): void
    {
        // Do nothing if the form is invalid
        if ( this.securityForm.invalid )
        {
            return;
        }

        // Disable the form
        this.securityForm.disable();

        // Hide the alert
        this.showAlert = false;
        
        // Sign up
        this._settingsService.changePassword({'currentPassword':this.securityForm.value.currentPassword,'newPassword':this.securityForm.value.newPassword})
            .subscribe(
                (response) => {
                   
                    // Navigate to the confirmation required page
                    //this._router.navigateByUrl('/confirmation-required');
                    this.securityForm.enable();
                    this.securityNgForm.resetForm();
                    this._authService.signOut().subscribe(a=>this._router.navigate(['sign-in']));
                },
                (error) => {
                    
                    // Re-enable the form
                    this.securityForm.enable();

                    // Reset the form
                    //this.signUpNgForm.resetForm();

                    // Set the alert
                    this.alert = {
                        type   : 'error',
                        message: error.error.message || 'Invalide.'
                    };

                    // Show the alert
                    this.showAlert = true;
                }
            );
    }

    mustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                // return if another validator has already found an error on the matchingControl
                return;
            }

            // set error on matchingControl if validation fails
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }
}
