import {Component, Input} from '@angular/core';
import {Category} from "../../model/category/category.model";

@Component({
  selector: 'app-service-view',
  templateUrl: './service-view.component.html',
  styleUrls: ['./service-view.component.css']
})
export class ServiceViewComponent {

  @Input()
  public category! : Category;
}
