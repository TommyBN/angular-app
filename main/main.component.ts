import { Component, OnInit } from '@angular/core';
import { GetProductsService } from '../get-products.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public products:any[] = [];
  public currentProduct = { id: 0, name: '', description: '', price: 0 }
  public filterValue:string="";
  public productKeys:string[] = ['id', 'name', 'description', 'creationDate', 'price'];
  public sortByMe:string = 'id';
  private errorMsg = null;

  constructor(private getProductsService: GetProductsService) { }

  ngOnInit() {
    let apiData = [];
    this.getProductsService.getProducts().subscribe(data => {
      apiData = data;
      for (let i = 0; i < apiData.length; i++) {
        switch (apiData[i]["type"]) {
          case 1:
            this.products.push(apiData[i]["fedex"]);
            break;
          case 2:
            for (let product of apiData[i]["ups"]) {
              this.products.push(product);
            }
            break;
          case 3:
            this.products.push(apiData[i])
        }
      }
    }, error => this.errorMsg = error.message)
    
  }

  showProductDetails(product){
    this.currentProduct = product;
  }

  saveChanges(name){
    window.alert(`Thank you for updating product ${name}`)
  }

  changeSort(sortValue){
    this.sortByMe = sortValue
  }
}
