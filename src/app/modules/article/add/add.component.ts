import {
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {Location} from "@angular/common";
import {fuseAnimations} from "../../../../@fuse/animations";
import {FuseAlertType} from "../../../../@fuse/components/alert";
import {ToastrServiceCustom} from "../../../core/services/toastr.service";

@Component({
    selector       : 'article-add',
    templateUrl    : './add.component.html',
    encapsulation  : ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AddComponent implements OnInit,OnDestroy
{

    private _unsubscribeAll: Subject<any>;

    @ViewChild('userNgForm') userNgForm: NgForm;
    userForm: FormGroup;
    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _location: Location,
        private _formBuilder: FormBuilder,
        private _toastr:ToastrServiceCustom,
    )
    {
        this._unsubscribeAll = new Subject();
    }
    /**
     * On init
     */
    ngOnInit(): void
    {
        this.userForm = this._formBuilder.group({
            matricule  : ['',[Validators.required,Validators.pattern(/^(([0-9]{6}\-[0-9]{2}\-[0-9]{2}\-[0-9]{2})|([0-9]*\/FAR))$/)]],
        });

    }


    save(){
        // Do nothing if the form is invalid
        if ( this.userForm.invalid )
        {
            return;
        }
        console.log('form',this.userForm.value)

        // Disable the form
        this.userForm.disable();


    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    back() {
        this._location.back();
    }
}
