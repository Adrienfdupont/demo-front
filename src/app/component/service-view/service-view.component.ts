import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CatalogService} from "../../service/catalog/catalog.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../model/category/category.model";
import {Distribution} from "../../model/distribution/distribution.model";

@Component({
  selector: 'app-service-view',
  templateUrl: './service-view.component.html',
  styleUrls: ['./service-view.component.css']
})
export class ServiceViewComponent implements OnInit{
  updatedCategoryForm!: FormGroup;
  createDistributionForm!: FormGroup;
  @Input() category!: Category;
  isFlipped = false;
  isAdding = false;

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
    this.createDistributionForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
    })
  }

  removeCategory(id: number) {
    this.catalogService.deleteCategory(id).subscribe(
      () => {
      this.onDelete.emit(id);
      }
    )
  } 

  updateCategory() {
    const newCategory = new Category(this.category);
    newCategory.name = this.updatedCategoryForm.getRawValue().name;
    this.catalogService.updateCategory(newCategory).subscribe({
      next: (category: any) => this.category = category,
      error: () => alert('Une erreur est survenue.'),
    });
  }

  addDistribution() {
    const newDistribution: Distribution = new Distribution(this.createDistributionForm.getRawValue());
    newDistribution.categoryId = this.category.id;
    this.catalogService.createDistribution(newDistribution).subscribe({      
      next: (distribution: Distribution) => this.category.distributions?.push(new Distribution(distribution)),
      error: () => alert('Une erreur est survenue.'),
    });
  }

  removeDistribution(id: number) {
    this.catalogService.deleteDistribution(id).subscribe({
      next: () =>
        this.category.distributions = this.category.distributions.filter(distribution => distribution.id !== id),
      error: () => alert('Une erreur est survenue.'),
    })
  }
}
