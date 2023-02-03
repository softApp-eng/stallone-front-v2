import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UsersService} from "../users.service";
import {User} from "../../../core/user/user.types";
import {FuseConfirmationConfig, FuseConfirmationService} from "../../../../@fuse/services/confirmation";
import {UserService} from "../../../core/user/user.service";
import {takeUntil} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector       : 'user-list',
    templateUrl    : './user-list.component.html',
    styleUrls  : ['./user-list.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit, OnDestroy
{

    displayedColumns: string[] = ['username','origine','accountStatus','ROLES','PRIVILEGES','ACTION'];
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    dataSource = new MatTableDataSource<User>([]);
    isLoadingResults = false;//met la true pour appliquer le spinner

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    configDialoge:FuseConfirmationConfig={
        "title": "Supprimer utilisateur",
        "message": "Vous voulez vraiment supprimer cet utilisateur? <span class=\"font-medium\">Cette action ne peut pas être annulée!</span>",
        "icon": {
            "show": true,
            "name": "heroicons_outline:exclamation",
            "color": "warn"
        },
        "actions": {
            "confirm": {
                "show": true,
                "label": "supprimer",
                "color": "warn"
            },
            "cancel": {
                "show": true,
                "label": "Annuler"
            }
        },
        "dismissible": true
    };
    currentUserId;
    user:User;
    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _usersService: UsersService,
        private _user: UserService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _snackBar: MatSnackBar,
    )
    {

    }
    /**
     * On init
     */
    ngOnInit(): void
    {
        this.getAllUsers();
        this._user.user$
            .pipe((takeUntil(this._unsubscribeAll)))
            .subscribe((user: User) => {
                this.user = user;
            }).unsubscribe();

    }

    getAllUsers(){
        this.isLoadingResults = true;
        this._usersService.getAll().subscribe((data:User[])=>{
            console.log(data);
            this.dataSource.data = data;
            this.isLoadingResults = false;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
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

    delete(userid) {
        if (userid == this.user.userid)
            alert("vous ne pouvez pas supprimer l'utilisateur courrent.")
        // Open the dialog and save the reference of it
        const dialogRef = this._fuseConfirmationService.open(this.configDialoge);

        // Subscribe to afterClosed from the dialog reference
        dialogRef.afterClosed().subscribe((result) => {
            if (result === 'confirmed')
                this._usersService.delete(userid).subscribe(resp=>{
                    this._snackBar.open('Utilisateur supprimé!', 'ok', {duration: 5000});
                    this.dataSource.data = this.dataSource.data.filter((u:User) =>
                        u.userid != userid
                    );
                },error => {
                    this._snackBar.open('probleme de supprission!', 'ok', {duration: 5000});
                });
        });
    }

}
