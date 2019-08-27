import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { EventsService } from 'src/app/shared/services/events.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { AppComponent } from 'src/app/app.component';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent, MatPaginator } from '@angular/material/paginator';


export interface Categories {
  title: string;

}

export interface Tags {
  title: string;
}



@Component({
  selector: 'app-register-event-type',
  templateUrl: './register-event-type.component.html',
  styleUrls: ['./register-event-type.component.scss']
})

@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    SwiperModule
  ],
  providers: [],
  bootstrap: []
})


export class RegisterEventTypeComponent implements OnInit {
  tagForm: FormGroup;
  public all_items_tag: Tags[] = [];
  public items_tag: Tags[];

  categoryForm: FormGroup;
  public all_items: Categories[] = [];
  public items: Categories[] = [];
  // public newItem: Categories[];

  public ELEMENT_DATA_TAG: Tags[];
  public ELEMENT_DATA: Categories[];
  
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private eventService: EventsService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {  }

    setAll(items) {
      this.all_items = items;
      this.items = this.all_items;
      this.dataSource = this.all_items;
      console.log(this.dataSource);
    }

    setAllTags(items_tag){
      this.all_items_tag = items_tag;
      this.items_tag = this.all_items_tag;
      this.dataSourceTag = this.all_items_tag;
      console.log(this.dataSourceTag);
    }

  columnsToDisplay: string[] = ['title'];

  dataSource = this.ELEMENT_DATA;
  dataSourceTag = this.ELEMENT_DATA_TAG;

  pageEvent: PageEvent;

  ngOnInit() {
    this.tagForm = this.formBuilder.group({
      tagName: ['', Validators.required]
    })
    this.categoryForm = this.formBuilder.group({
      catName: ['', Validators.required]
    })
    this.loadTagList();
    this.loadCategoryList();
  };


  categoryDelete(id: string) {
    console.log(id);
    this.eventService.delete_category(id).subscribe(_ => {
      this.loadCategoryList();
    });

  }

  tagDelete(id: string){
    console.log(id);
    this.eventService.delete_tag(id).subscribe(_ => {
      this.loadTagList();
    });
  }

  loadTagList(){
    this.eventService.get_tags().subscribe(
      (itens: Tags) => this.setAllTags(itens),
    );
  }

  loadCategoryList() {
    this.eventService.get_categories().subscribe(
      (itens: Categories) => this.setAll(itens),
    );
  }

  onSubmit() {

    if (this.categoryForm.invalid) {
      return;
    }
    const categoryName = this.categoryForm.get('catName').value;
   
    if (this.all_items.some(e => e.title.toLowerCase() == categoryName.toLowerCase())) {
      this.snackBar.open("Categoria já cadastrada.", "Ok", { duration: 5000 });
      return;
    }

    this.eventService.createCategory(this.categoryForm).subscribe(obj => {
      this.snackBar.open("Categoria cadastrada com sucesso", "Ok", { duration: 5000 });
      this.loadCategoryList()
    })
  }

  onSubmitTag(){
    if (this.tagForm.invalid) {
      return;
    }
    const tagName = this.tagForm.get('tagName').value;
   
    if (this.all_items_tag.some(e => e.title.toLowerCase() == tagName.toLowerCase())) {
      this.snackBar.open("Tag já cadastrada.", "Ok", { duration: 5000 });
      return;
    }

    this.eventService.createTag(this.tagForm).subscribe(obj => {
      this.snackBar.open("Tag cadastrada com sucesso", "Ok", { duration: 5000 });
      this.loadTagList();
    })
  }

}