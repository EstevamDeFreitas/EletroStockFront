import { CategoryDTO } from 'src/app/access/models/categoryDTO.model';
import { CategoriesService } from './../../access/services/categories/categories.service';
import { ProductService } from './../../access/services/product/product.service';
import { PriceGroupService } from './../../access/services/pricre/priceGroup.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PriceGroupDTO } from './../../access/models/priceGroupDTO.model';
import { Component, OnInit } from '@angular/core';
import { ProductDTO } from 'src/app/access/models/productDTO.model';
import { ProductCategoriesDTO } from 'src/app/access/models/productCategoriesDTO.model';
import { InactiveReasonDTO } from 'src/app/access/models/inactiveReasonDTO.model';
import { ProductImageDTO } from 'src/app/access/models/ProductImageDTO.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product: ProductDTO = new ProductDTO();
  formPriceGroup: FormGroup = new FormGroup({});
  formPriceGroupList: FormGroup[] = [];
  products : ProductDTO[] = [];

  priceGroups: PriceGroupDTO[] = [];
  price: PriceGroupDTO = new PriceGroupDTO();

  category: CategoryDTO[] = [];
  selectedCategory: CategoryDTO[] = [];

  isProductCreate: boolean = false;
  isProductEdit: boolean = false;

  constructor(private formBuilder: FormBuilder, private productService: ProductService,
    private productCategoryService: CategoriesService, private priceGroupService: PriceGroupService) { }

  ngOnInit() {
    this.getAllProducts();
    this.getAllCategories();
    this.getAllPriceCategories();
  }

  getAllProducts() {
    this.productService.getProducts().subscribe(res => {
      this.formPriceGroupList = []
      this.products = res.data;
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
      this.priceGroups = res.data;
    })
  }

  createForm(product: ProductDTO) {
    return this.formBuilder.group({
     id: [product.id],
     code: [product.code],
     name: [product.name],
     description: [product.description],
     priceGroupId: [product.priceGroupId],
     categories: [product.productCategories]
    });

  }

  newProduct() {
    this.product = new ProductDTO();

    this.formPriceGroup = this.createForm(this.product);
    this.isProductCreate = true;
    this.isProductEdit = false;
  }

  createProduct(formPriceGroup: FormGroup) {

    this.productService.CreateProduct(this.generateProductFromForm(formPriceGroup)).subscribe(res => {
      this.getAllProducts();
      this.isProductCreate = false;
    });

  }

  generateProductFromForm(formPriceGroup: FormGroup){
    let product = new ProductDTO();

    product.id = formPriceGroup.controls['id'].value;
    product.name = formPriceGroup.controls['name'].value;
    product.code = formPriceGroup.controls['code'].value;
    product.description = formPriceGroup.controls['description'].value;

    this.selectedCategory.forEach((x, index) =>{
      let productCategory = new ProductCategoriesDTO();

      productCategory.categoryId = x.id;

      product.productCategories.push(productCategory);
    })

    product.priceGroupId = formPriceGroup.controls['priceGroupId'].value;

    return product;
  }

  selectEditProduct(product: ProductDTO){
    this.formPriceGroup = this.createForm(product);
    this.loadSelectedCategories(product);
    this.isProductEdit = true;
    this.isProductCreate = false;
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

  loadSelectedCategories(product:ProductDTO){
    this.selectedCategory = [];
    product.productCategories.forEach(cat => {

    })
  }

  setPriceGroup() {
    this.formPriceGroup.controls['priceGroupId'].setValue(this.price.id);
  }

  updateProduct(product: FormGroup) {
    this.productService.updateProduct(this.generateProductFromForm(product)).subscribe(res => {

    });
  }

  deleteProduct(product: ProductDTO) {

  }

}
