import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from "../users.service";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {FuseAlertType} from "../../../../@fuse/components/alert";
import {fuseAnimations} from "../../../../@fuse/animations";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector       : 'user-add',
    templateUrl    : './user-add.component.html',
    styleUrls  : ['./user-add.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    //changeDetection: ChangeDetectionStrategy.OnPush,
    animations   : fuseAnimations
})
export class UserAddComponent implements OnInit
{

    @ViewChild('userNgForm') userNgForm: NgForm;
    userForm: FormGroup;
    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    showAlert: boolean = false;
    unites;
    roles;
    userid;

    selectedUnites = [];
    selectedroles = [];

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
        this.loadUnites();
        this.loadroles();
        this.userForm = this._formBuilder.group({
            userid  : [this.userid],
            username  : ['',[Validators.required,Validators.pattern(/^\S*$/),Validators.maxLength(20),Validators.minLength(3)]],
            origine      : ['',[Validators.required,Validators.maxLength(250)]],
            unitescode     : [this.selectedUnites,Validators.required],
            rolesId     : [this.selectedroles,Validators.required],
            password     : ['',[Validators.required,Validators.maxLength(50),Validators.minLength(6)]],
            confirmation     : ['',Validators.required],
            accountStatus     : [true]
        },{
            validator: this.mustMatch('password', 'confirmation')
        });

        if ( this._router.url.includes('edit') ) {
            this.initializeForm();
        }

    }

    loadUnites(){
        this._usersService.getUnites().subscribe((data)=>this.unites = data);
    }

    loadroles(){
        this._usersService.getRoles().subscribe((data)=>this.roles = data);
    }

    save(){
        // Do nothing if the form is invalid
        if ( this.userForm.invalid )
        {
            return;
        }

        // Disable the form
        this.userForm.disable();

        this._usersService.save(this.userForm.value,(this.userid)?true:false )
            .subscribe(resp=>{
                // Set the alert
                this.alert = {
                    type   : 'success',
                    message: (this.userid)?'Utilisateur bien modifié.':'Utilisateur bien enregistré.'
                };

                // Show the alert
                this.showAlert = true;
                this.userForm.enable();
            },error => {
                // Set the alert
                this.alert = {
                    type   : 'error',
                    message: error.error.message || 'Invalide.'
                };

                // Show the alert
                this.showAlert = true;
                this.userForm.enable();
            });
    }

    initializeForm(){
        this.userForm.disable();
        this.userid = this._activeRoute.snapshot.params.id;
        this._usersService.getById(this.userid).subscribe((data:any)=>{
            console.log('data',data)
            this.userForm.patchValue({userid: data?.userid});
            this.userForm.patchValue({username: data?.username});
            this.userForm.patchValue({origine: data?.origine});
            this.selectedUnites = data?.unitescode;
            this.selectedroles = data?.rolesId;
            this.userForm.patchValue({accountStatus: data?.accountStatus});
            this.userForm.patchValue({password: '000000'});
            this.userForm.patchValue({confirmation: '000000'});

            this.userForm.enable();
        },error => {
            console.log(error)
            this._snackBar.open('user introuvable!', 'ok', {duration: 5000});
            this._router.navigateByUrl('/user/list');
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
