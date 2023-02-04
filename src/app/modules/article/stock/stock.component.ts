import {ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {User} from "../../../core/user/user.types";
import {ArticleService} from "../article.service";

@Component({
    selector       : 'stock',
    templateUrl    : './stock.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockComponent implements OnInit
{

    displayedColumns: string[] = ['code','designation','quantite','prix'];
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    dataSource = new MatTableDataSource<User>([]);

    /**
     * Constructor
     */
    constructor(
        private _articleService:ArticleService
    )
    {

    }

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._articleService.getStock().subscribe((data:any)=>{
            this.dataSource.data = data;
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

}
