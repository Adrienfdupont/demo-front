import {Component, OnInit} from '@angular/core';
import {CatalogService} from "../../service/catalog/catalog.service";
import {Category} from "../../model/category/category.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  categories: Category[] | undefined;
  isLoading!: boolean;
  newCategoryForm!: FormGroup;

  constructor(
    private catalogService : CatalogService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.getCategories();

    this.newCategoryForm = this.formBuilder.group({
      name: [null, Validators.required],
    });
  }

  getCategories() {
    this.isLoading = true;
    this.catalogService.getCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
        this.isLoading = false;
      },
      error: () => alert('Une erreur est survenue.'),
    })
  }

  addCategory() {
    const newCategory = new Category(this.newCategoryForm.getRawValue());
    this.catalogService.createCategory(newCategory).subscribe({
      next: (category: Category) => this.categories?.push(new Category(category)),
      error: () => alert('Une erreur est survenue.'),
    })
  }

  hideCategory(id: number) {
    this.categories = this.categories?.filter(category => category.id !== id);
  }
}
