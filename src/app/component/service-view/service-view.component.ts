import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CatalogService} from "../../service/catalog/catalog.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../model/category/category.model";

@Component({
  selector: 'app-service-view',
  templateUrl: './service-view.component.html',
  styleUrls: ['./service-view.component.css']
})
export class ServiceViewComponent implements OnInit{
  updatedCategoryForm!: FormGroup;
  @Input() category!: Category;
  isFlipped = false;

  @Output()
  public onDelete : EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private catalogService: CatalogService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.updatedCategoryForm = this.formBuilder.group({
      name: [null, Validators.required],
    });
  }

  removeCategory(id: number) {
    this.catalogService.deleteCategory(id).subscribe(
      () => {
      this.onDelete.emit(id);
      }
    )
  }

  updateCategory() {
    this.category.name = this.updatedCategoryForm.getRawValue().name;
    this.catalogService.updateCategory(this.category).subscribe(
      error => alert('Une erreur est survenue.'),
    );
  }
}
