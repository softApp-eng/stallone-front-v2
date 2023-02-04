import {
    Component, HostListener,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Location} from "@angular/common";
import {fuseAnimations} from "../../../../@fuse/animations";
import {ToastrServiceCustom} from "../../../core/services/toastr.service";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {ArticleService} from "../article.service";
import {environment} from "../../../../environments/environment";

@Component({
    selector       : 'article-add',
    templateUrl    : './add.component.html',
    encapsulation  : ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AddComponent implements OnInit
{
    article;
    url = environment.apiUrl;
    UPC = '';

    /**
     * Constructor
     */
    constructor(
        private _location: Location,
        private _formBuilder: FormBuilder,
        private _toastr:ToastrServiceCustom,
        private _articleService:ArticleService,
    )
    {
    }
    /**
     * On init
     */
    ngOnInit(): void
    {

    }

    @HostListener('document:keydown', ['$event'])
    onMessage(event) {
        if (event.code.startsWith('Digit')){
            this.UPC += event.key;
        }
        if (event.code === 'Enter'){
            this.getArticle(this.UPC);
        }

    }

    getArticle(code){
        this.UPC = '';
        console.log('article code',code)
        if (code && code > 0)
        this._articleService.getArticleByCode(code).subscribe({
            next:(data)=>{
                console.log(data)
                this.article = data;
            },
            error:(error)=>{
                this._toastr.error('Article non trouvé.');
                this.article = undefined;
            }
        })
    }

    saveQuantite(qte) {
        if (this.article)
            this._articleService.addArticleQuantite(this.article.id,qte).subscribe({
                next:(data)=>{
                    console.log(data)
                    this.article = data;
                    this._toastr.success('Stock modifé');
                },
                error:(error)=>{
                    console.log(error)
                    this._toastr.error(error?.error?.description);
                }
            });
    }
}
