import { CategoriesService } from './../../../access/services/categories/categories.service';
import { Component, OnInit } from '@angular/core';
import { CategoryDTO } from 'src/app/access/models/categoryDTO.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-products-categories',
  templateUrl: './products-categories.component.html',
  styleUrls: ['./products-categories.component.scss']
})
export class ProductsCategoriesComponent implements OnInit {

  public category: CategoryDTO = new CategoryDTO();
  public formCategoryList: FormGroup[] = [];
  public formCategory: FormGroup = new FormGroup({});
  public isCategory = false;
  public isCategoryEdit = false;

  constructor(private categoriesService: CategoriesService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoriesService.getCategories().subscribe(res => {
      if(res.message === "Categories Found") {
        this.formCategoryList = []
        res.data.forEach(category => {
          this.formCategoryList.push(this.createCategoryForm(category));
        })
      }
    })
  }

  createCategoryForm(category: CategoryDTO) {
    return this.formBuilder.group({
      id: [category.id],
      name: [category.name],
      description: [category.description],
      categoryEdit: [this.isCategoryEdit]
    })
  }

  newCategory() {
    this.category = new CategoryDTO();
    this.formCategory = this.createCategoryForm(this.category);
    this.isCategory = true;
  }

  createCategory(formCategory: FormGroup) {
    this.category.id = formCategory.controls['id'].value;
    this.category.name = formCategory.controls['name'].value;
    this.category.description = formCategory.controls['description'].value;
    console.log('category', this.category);

    this.categoriesService.createCategory(this.category).subscribe(res => {
      if (res.message === "Category Created") {
        this.isCategory = false;
        this.getAllCategories();
      }
    })
  }

  editCategory(i: number) {
    this.formCategoryList[i].controls['categoryEdit'].setValue(true);
  }

  updateCategory(formCategory: FormGroup) {
    this.category.id = formCategory.controls['id'].value;
    this.category.name = formCategory.controls['name'].value;
    this.category.description = formCategory.controls['description'].value;

    this.categoriesService.updateCategory(this.category).subscribe(res => {
      if (res.message === "Category Updated") {
        this.isCategoryEdit = false;
        this.getAllCategories();
      }
    })
  }

  deleteCategory(formCategory: FormGroup) {
    this.category.id = formCategory.controls['id'].value;

    this.categoriesService.deleteCategory(this.category.id).subscribe(res => {
      if (res.message === "Category Deleted") {
        this.getAllCategories();
      }
    })
  }
}
