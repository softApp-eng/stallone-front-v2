import {Injectable} from "@angular/core";
import {ToastrService} from "ngx-toastr";

@Injectable({providedIn:'root'})
export class ToastrServiceCustom {
    /**
     * Constructor
     */
    constructor( private toastr: ToastrService ) {
    }


    success(msg:string){
        this.toastr.success(msg,'', {progressBar: true});
    }

    info(msg:string){
        this.toastr.info(msg,'', {progressBar: true});
    }

    warning(msg:string){
        this.toastr.warning(msg,'', {progressBar: true});
    }

    error(msg:string){
        this.toastr.error(msg,'', {progressBar: true});
    }
}
