import {ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from "../users.service";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {FuseAlertType} from "../../../../@fuse/components/alert";
import {fuseAnimations} from "../../../../@fuse/animations";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector       : 'user-mdp',
    templateUrl    : './user-mdp.component.html',
    styleUrls  : ['./user-mdp.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    //changeDetection: ChangeDetectionStrategy.OnPush,
    animations   : fuseAnimations
})
export class UserMdpComponent implements OnInit
{

    @ViewChild('userNgForm') userNgForm: NgForm;
    userForm: FormGroup;
    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    showAlert: boolean = false;
    userid;


    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _usersService: UsersService,
        private _formBuilder: FormBuilder,
        private _activeRoute:ActivatedRoute,
        private _snackBar: MatSnackBar,
    )
    {
    }

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.userid = this._activeRoute.snapshot.params.id;
        this.userForm = this._formBuilder.group({
            password     : ['',[Validators.required,Validators.maxLength(50),Validators.minLength(6)]],
            confirmation     : ['',Validators.required],
        },{
            validator: this.mustMatch('password', 'confirmation')
        });

    }


    save(){
        // Do nothing if the form is invalid
        if ( this.userForm.invalid )
        {
            return;
        }

        // Disable the form
        this.userForm.disable();

        this._usersService.editMdp(this.userForm.value.password,this.userid )
            .subscribe(resp=>{
                // Set the alert
                this.alert = {
                    type   : 'success',
                    message: 'Mot de passe modifié.'
                };

                // Show the alert
                this.showAlert = true;
                this.userForm.enable();
            },error => {
                // Set the alert
                this.alert = {
                    type   : 'error',
                    message: 'Invalide.'
                };

                // Show the alert
                this.showAlert = true;
                this.userForm.enable();
            });
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
