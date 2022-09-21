import { PriceGroupService } from './../../../access/services/pricre/priceGroup.service';
import { PriceGroupDTO } from './../../../access/models/priceGroupDTO.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-price-categories',
  templateUrl: './price-categories.component.html',
  styleUrls: ['./price-categories.component.scss']
})
export class PriceCategoriesComponent implements OnInit {

  public priceCategory: PriceGroupDTO = new PriceGroupDTO();
  public formPriceCategoryList: FormGroup[] = [];
  public formPriceCategory: FormGroup = new FormGroup({});
  public isPriceCategoryCreate = false;
  public isPriceCategoryEdit = false;

  constructor(private formBuilder: FormBuilder, private priceGroupService: PriceGroupService) { }

  ngOnInit() {
    this.getAllPriceCategory();
  }

  getAllPriceCategory() {
    this.priceGroupService.getPriceGroups().subscribe(res => {
      if(res.message === "Price Group Found") {
        res.data.forEach(priceCategory => {
          this.formPriceCategoryList.push(this.createPriceCategoryForm(priceCategory));
        })
      }
    })
  }

  createPriceCategory(priceCategoryForm: FormGroup) {
    this.priceCategory.Id = priceCategoryForm.controls['id'].value;
    this.priceCategory.Name = priceCategoryForm.controls['name'].value;
    this.priceCategory.Description = priceCategoryForm.controls['description'].value;
    this.priceCategory.ProfitMargin = priceCategoryForm.controls['priceCategory'].value;

    this.priceGroupService.createPriceGroup(this.priceCategory).subscribe(res => {
      if(res.message === "Price Group Created") {
        this.priceCategory = new PriceGroupDTO();
        this.isPriceCategoryCreate = false;
        this.getAllPriceCategory();
      }
    })
  }

  createPriceCategoryForm(priceCategory: PriceGroupDTO) {
    return this.formBuilder.group({
      id: [priceCategory.Id],
      name: [priceCategory.Name],
      description: [priceCategory.Description],
      profitMargin: [priceCategory.ProfitMargin],
      priceCategoryEdit: [this.isPriceCategoryEdit]
    })
  }

  updateCategory(priceCategoryForm: FormGroup) {
    this.priceCategory.Id = priceCategoryForm.controls['id'].value;
    this.priceCategory.Name = priceCategoryForm.controls['name'].value;
    this.priceCategory.Description = priceCategoryForm.controls['description'].value;
    this.priceCategory.ProfitMargin = priceCategoryForm.controls['priceCategory'].value;

    this.priceGroupService.updatePriceGroup(this.priceCategory).subscribe(res => {
      if(res.message === "Price Group Updated") {
        this.priceCategory = new PriceGroupDTO();
        this.isPriceCategoryEdit = false;
        this.getAllPriceCategory();
      }
    })
  }

  newPriceCategory() {
    this.priceCategory = new PriceGroupDTO();
    this.createPriceCategoryForm(this.priceCategory);
    this.isPriceCategoryCreate = true;
  }

  editPriceCategory(i: number) {
    this.formPriceCategoryList[i].controls['priceCategoryEdit'].setValue(true);
  }

  deletePriceCategory(priceCategoryForm: FormGroup) {
    this.priceCategory.Id = priceCategoryForm.controls['id'].value;

    this.priceGroupService.deletePriceGroup(this.priceCategory.Id).subscribe(res => {
      if(res.message === "Price Group Deleted") {
        this.getAllPriceCategory();
      }
    })
  }
}
