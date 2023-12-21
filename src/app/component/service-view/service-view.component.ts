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
  updateDistributionForm!: FormGroup;
  @Input() category!: Category;
  isFlipped = false;
  isAdding = false;
  updatingDistribution: number | undefined

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
    });
    this.updateDistributionForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
    });
  }

  removeCategory() {
    this.catalogService.deleteCategory(this.category.id).subscribe({
      next: () => this.onDelete.emit(this.category.id),
      error: () => alert('Une erreur est survenue.'),
    })
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

  updateDistribution(distribution: Distribution) {
    this.updatingDistribution = undefined;
    const newDistribution = new Distribution(this.updateDistributionForm.getRawValue());
    newDistribution.id = distribution.id;
    this.catalogService.updateDistribiution(newDistribution).subscribe({
      next: (updatedDistribution: Distribution) => distribution = newDistribution,
      error: () => alert('Une erreur est survenue.'),
    });
  }

  setUpdatingDistribution(id: number) {
    if (this.updatingDistribution !== id) {
      this.updatingDistribution = id;
    } else {
      this.updatingDistribution = undefined;
    }
  }
}
