import { Component, HostListener, OnInit } from '@angular/core';
import { ToastrServiceCustom } from 'app/core/services/toastr.service';
import { environment } from 'environments/environment';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { ArticleService } from '../article/article.service';
export interface ConfirmModel {
  title:string;
  message:string;
}
@Component({
  selector: 'app-simple-modal-component',
  templateUrl: './simple-modal-component.component.html',
  styleUrls: ['./simple-modal-component.component.scss']
})

export class SimpleModalComponentComponent  extends SimpleModalComponent<ConfirmModel, boolean> implements ConfirmModel,OnInit {
  article;
  url = environment.apiUrl;
  UPC = '';
 

  ngOnInit(): void {
  }
  title: string;
  message: string;
  constructor( private _toastr:ToastrServiceCustom,
    private _articleService:ArticleService) {
    super();
  }
  confirm() {
    // we set modal result as true on click on confirm button,
    // then we can get modal result from caller code
    this.result = true;
    this.close();
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
}
