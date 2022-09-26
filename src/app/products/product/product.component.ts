import { CategoryDTO } from 'src/app/access/models/categoryDTO.model';
import { CategoriesService } from './../../access/services/categories/categories.service';
import { ProductService } from './../../access/services/product/product.service';
import { PriceGroupService } from './../../access/services/pricre/priceGroup.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PriceGroupDTO } from './../../access/models/priceGroupDTO.model';
import { Component, OnInit } from '@angular/core';
import { ProductDTO } from 'src/app/access/models/productDTO.model';
import { ProductCategoriesDTO } from 'src/app/access/models/productCategoriesDTO.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product: ProductDTO = new ProductDTO();
  formPriceGroup: FormGroup = new FormGroup({});
  formPriceGroupList: FormGroup[] = [];

  priceGroup: PriceGroupDTO[] = [];
  price: PriceGroupDTO = new PriceGroupDTO();

  category: CategoryDTO[] = [];
  selectedCategory: CategoryDTO[] = [];

  isProductCreate: boolean = false;
  isPoductEdit: boolean = false;

  constructor(private formBuilder: FormBuilder, private productService: ProductService,
    private productCategoryService: CategoriesService, private priceGroupService: PriceGroupService) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getProducts().subscribe(res => {
      if(res.message == "Products Found") {
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
     categories: [product.productCategories],
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

    this.product.id = formPriceGroup.controls['id'].value;
    this.product.name = formPriceGroup.controls['name'].value;
    this.product.code = formPriceGroup.controls['code'].value;

    this.selectedCategory.forEach((x, index) =>{
      let productCategory = new ProductCategoriesDTO();

      productCategory.categoryId = x.id;

      this.product.productCategories.push(productCategory);
    })

    this.product.priceGroupId = formPriceGroup.controls['priceGroupId'].value;

    this.productService.CreateProduct(this.product).subscribe(res => {

    });

  }

  editProduct(i: number) {
    this.formPriceGroupList[i].controls['productEdit'].setValue(true);
  }

  setCategory(i: number, e: any) {
    if (e.target.checked) {
      this.selectedCategory.push(this.category[i]);
    } else {
      this.selectedCategory.splice(i, 1);
    }
  }

  setPriceGroup() {
    this.formPriceGroup.controls['priceGroupId'].setValue(this.price.id);
  }

  updateProduct(priceGroup: FormGroup) {

  }

  deleteProduct(product: FormGroup) {

  }

}
