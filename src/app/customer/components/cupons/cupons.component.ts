import { Component, OnInit } from '@angular/core';
import { CouponCustomerDTO } from 'src/app/access/models/cupomDTO';
import { CouponService } from 'src/app/access/services/coupon/coupon.service';

@Component({
  selector: 'app-cupons',
  templateUrl: './cupons.component.html',
  styleUrls: ['./cupons.component.scss']
})
export class CuponsComponent implements OnInit {

  public cupons : CouponCustomerDTO[] = [];

  constructor(private couponService :CouponService) { }

  ngOnInit(): void {
    this.getCustomerCoupons();
  }

  getCustomerCoupons(){
    this.couponService.getCustomerCoupons().subscribe(res => {
      this.cupons = res.data;
    })
  }

}
