import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SaleService } from 'src/app/access/services/sale/sale.service';
import { RefundStatus, SaleDTO, SaleItemDTO, SaleItemSummaryDTO } from 'src/app/customer/models/saledto';

@Component({
  selector: 'app-refund-detail',
  templateUrl: './refund-detail.component.html',
  styleUrls: ['./refund-detail.component.scss']
})
export class RefundDetailComponent implements OnInit {

  private saleId : string = '';

  public sale : SaleDTO = new SaleDTO();

  constructor(private saleService : SaleService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.getRouteid();
    this.getSale();
  }

  getRouteid(){
    this.route.params.subscribe(param => {
      this.saleId = param['id'];
    })
  }

  getSale(){
    this.saleService.getSale(this.saleId).subscribe(res => {
      this.sale = res.data;
    });
  }

  getValueFromRefundStatus(value : number){
    let stringValue = '';

    switch(value){
      case 0 :
        stringValue = '';
        break;
      case 1 :
        stringValue = 'Reembolso Solicitado';
        break;
      case 2 :
        stringValue = 'Reembolso Aprovado';
        break;
      case 3 :
        stringValue = 'Reembolso Finalizado';
        break;
        case 4 :
          stringValue = 'Reembolso Negado';
          break;
    }

    return stringValue;
  }

  changeRefundStatus(item : SaleItemDTO, status : RefundStatus){
    let summary = new SaleItemSummaryDTO();
    summary.productId = item.productId;
    summary.saleId = item.saleId;

    this.saleService.changeRefundStatus(summary, status).subscribe(res => {
      this.getSale();
    });
  }

  acceptInventory(item : SaleItemDTO){
    let summary = new SaleItemSummaryDTO();
    summary.productId = item.productId;
    summary.saleId = item.saleId;

    this.saleService.acceptInventory(summary).subscribe(res => {
      this.getSale();
    });
  }

}
