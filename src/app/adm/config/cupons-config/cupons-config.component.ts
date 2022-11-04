import { DatePipe } from '@angular/common';
import { CouponService } from './../../../access/services/coupon/coupon.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CupomDTO } from 'src/app/access/models/cupomDTO';

@Component({
  selector: 'app-cupons-config',
  templateUrl: './cupons-config.component.html',
  styleUrls: ['./cupons-config.component.scss'],
})
export class CuponsConfigComponent implements OnInit {
  public cupom: CupomDTO = new CupomDTO();
  public formCupomList: FormGroup[] = [];
  public formCupom: FormGroup = new FormGroup({});
  public isCupomCreate = false;
  public isCupomEdit = false;

  constructor(private formBuilder: FormBuilder, private cupomService: CouponService) {}

  ngOnInit() {
    this.getAllCupons();
  }

  getAllCupons() {
    this.cupomService.getCoupons().subscribe((res) => {
      console.log(res);
      if (res.message === 'Coupons Found') {
        this.formCupomList = [];
        res.data.forEach((cupom) => {
          this.formCupomList.push(this.createCupomForm(cupom));
        });
      }
    });
  }

  createCupomForm(cupom: CupomDTO) {
    return this.formBuilder.group({
      id: [cupom.id],
      name: [cupom.name],
      couponType: [cupom.couponType],
      validity: [cupom.validity],
      hasValidity: [cupom.hasValidity],
      value: [cupom.value],
      isCupomEdit: [this.isCupomEdit],
    });
  }

  newCupom() {
    this.cupom = new CupomDTO();
    this.formCupom = this.createCupomForm(this.cupom);
    this.isCupomCreate = true;
  }

  createCupom(formCupom: FormGroup) {
    // this.cupom.id = formCupom.controls['id'].value;
    this.cupom.name = formCupom.controls['name'].value;
    this.cupom.couponType = formCupom.controls['couponType'].value;
    this.cupom.validity = formCupom.controls['validity'].value;
    this.cupom.hasValidity = true;
    this.cupom.couponType = 1;
    this.cupom.value = formCupom.controls['value'].value;

    this.cupomService.createCoupon(this.cupom).subscribe((res) => {
      if (res.message === 'Coupon Created') {
        this.isCupomCreate = false;
        this.getAllCupons();
      }
    });
  }

  editCupom(i: number) {
    this.formCupomList[i].controls['isCupomEdit'].setValue(true);
  }

  updateCupom(formCupom: FormGroup) {
    this.cupom.id = formCupom.controls['id'].value;
    this.cupom.name = formCupom.controls['name'].value;
    this.cupom.couponType = 1;
    this.cupom.hasValidity = true;
    this.cupom.value = formCupom.controls['value'].value;

    this.cupomService.updateCoupon(this.cupom).subscribe((res) => {
      if (res.message === 'Coupon Updated') {
        this.isCupomEdit = false;
        this.getAllCupons();
      }
    });
  }

  deleteCupom(formCupom: FormGroup) {
    this.cupom.id = formCupom.controls['id'].value;

    this.cupomService.deleteCoupon(this.cupom.id).subscribe((res) => {
      if (res.message === 'Coupon Deleted') {
        this.getAllCupons();
      }
    });
  }
}
