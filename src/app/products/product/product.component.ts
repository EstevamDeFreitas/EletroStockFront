import { CategoryDTO } from 'src/app/access/models/categoryDTO.model';
import { CategoriesService } from './../../access/services/categories/categories.service';
import { ProductService } from './../../access/services/product/product.service';
import { PriceGroupService } from './../../access/services/pricre/priceGroup.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PriceGroupDTO } from './../../access/models/priceGroupDTO.model';
import { Component, OnInit } from '@angular/core';
import { ProductDTO } from 'src/app/access/models/productDTO.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product: ProductDTO = new ProductDTO();
  formPriceGroup: FormGroup = new FormGroup({});
  formPriceGroupList: FormGroup[] = [];
  category: CategoryDTO[] = [];
  priceGroup: PriceGroupDTO[] = [];

  isProductCreate: boolean = false;
  isPoductEdit: boolean = false;

  constructor(private formBuilder: FormBuilder, private productService: ProductService,
    private productCategoryService: CategoriesService, private priceGroupService: PriceGroupService) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getProducts().subscribe(res => {
      if(res.message == "Price Group Found") {
        res.data.forEach(product => {
          this.formPriceGroupList.push(this.createForm(product));
        });
      }
    })
  }

  getAllCategories() {
    this.productCategoryService.getCategories().subscribe(res => {
      this.category = res.data;
    })
  }

  getAllPriceCategories() {
    this.priceGroupService.getPriceGroups().subscribe(res => {
      this.priceGroup = res.data;
    })
  }

  createForm(product: ProductDTO) {
    return this.formBuilder.group({
     id: [product.id],
     code: [product.code],
     name: [product.name],
     description: [product.description],
     priceGroupId: [product.priceGroupId],
     categories: [this.category],
     priceGroups: [this.priceGroup],
     productEdit: [this.isPoductEdit]
    });

  }

  newProduct() {
    this.product = new ProductDTO();
    this.getAllCategories();
    this.getAllPriceCategories();

    this.formPriceGroup = this.createForm(this.product);
    this.isProductCreate = true;
  }

  createProduct(formPriceGroup: FormGroup) {
    this.formPriceGroupList.push(formPriceGroup);
  }

  editProduct(i: number) {
    this.formPriceGroupList[i].controls['productEdit'].setValue(true);
  }

  updateProduct(priceGroup: FormGroup) {

  }

  deleteProduct(product: FormGroup) {

  }

}
