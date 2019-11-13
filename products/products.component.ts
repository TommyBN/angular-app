import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetProductsService } from '../get-products.service';

@Component({
  selector: 'app-products',
  template: `
  <app-product-item  [product]="product" (click)="onSelect(product)" 
  *ngFor = "let product of filteredProducts">
  </app-product-item>
  `,
  styles: [`
  app-product-item{
    border: 4px solid black; margin: 10px; height: 150px; padding: 15px; cursor: pointer;
}
app-product-item:hover{
    border: 5px solid rgb(14, 28, 230);
}`]
})
export class ProductsComponent implements OnInit {

  @Input() products: any[] = [];
  @Input() filterValue: string;
  @Input() sortByMe: string;
  @Output() productSelected: EventEmitter<any> = new EventEmitter<any>();
  filteredProducts: any[];

  constructor(private getProductsService: GetProductsService) { }

  ngOnInit() {
    this.filteredProducts = this.products;
  }

  ngOnChanges() {

    this.filteredProducts = [];
    for (let product of this.products) {
      if (product.name.includes(this.filterValue) || product.description.includes(this.filterValue)) {
        this.filteredProducts.push(product);
      }
    }

    let sortBy = this.sortByMe;
    this.filteredProducts.sort((a, b) => {
      if (a[sortBy] > b[sortBy]) return 1
      else {
        if (b[sortBy] > a[sortBy]) return -1
        else return 0
      }
    })

  }

  onSelect(product) {
    this.productSelected.emit(product);
    window.scrollTo(0, 0);
  }



}
