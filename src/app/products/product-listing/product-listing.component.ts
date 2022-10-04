import { Component, OnInit } from '@angular/core';
import { ProductDTO } from 'src/app/access/models/productDTO.model';
import { ProductService } from 'src/app/access/services/product/product.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit {

  public products : ProductDTO[] = [];

  constructor(private productService : ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe(res => {
      this.products = res.data;
    })
  }

}
