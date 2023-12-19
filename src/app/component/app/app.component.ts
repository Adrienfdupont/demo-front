import {Component, OnInit} from '@angular/core';
import {CatalogService} from "../../service/catalog/catalog.service";
import {Category} from "../../model/category/category.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'front-catalog';

  categories: Category[] | undefined;
  isLoading : boolean = true;

  constructor(private catalogService : CatalogService) {}

  ngOnInit(): void {
    this.catalogService.getCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
        this.isLoading = false;
      },
      error => {alert('Erreur')}
    )
  }
}
