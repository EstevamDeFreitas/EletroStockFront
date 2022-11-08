import { Component, OnInit } from '@angular/core';
import { SaleService } from 'src/app/access/services/sale/sale.service';
import { SaleDTO, SaleItemDTO } from '../../models/saledto';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit {

  public sales : SaleDTO[] = [];
  public saleSelect : boolean[] = [];

  constructor(private saleService : SaleService) { }

  ngOnInit(): void {
    this.getSales();
  }

  getSales(){
    this.saleService.getCustomerSales().subscribe(res => {
      this.sales = res.data;

      this.saleSelect = [];

      this.sales.forEach(x => {
        this.saleSelect.push(true);
      })
    })
  }

  getValueFromStatus(value:number){
    let stringValue = '';

    switch(value){
      case 0 :
        stringValue = 'Em Análise';
        break;
      case 1 :
        stringValue = 'Pagamento Realizado';
        break;
      case 2 :
        stringValue = 'Em Transporte';
        break;
      case 3 :
        stringValue = 'Entrega Realizada';
        break;
      case 4 :
        stringValue = 'Finalizado';
        break;
      case 5:
        stringValue = 'Reembolso Solicitado';
        break;
    }

    return stringValue;
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

  requestRefund(sale : SaleDTO){
    let selectedProducts : SaleItemDTO[] = [];

    sale.saleItems.forEach(item => {
      if(item.isSelectedRefund){
        selectedProducts.push(item);
      }
    });

    this.saleService.requestRefund(selectedProducts).subscribe(res => {
      this.getSales();
    })
  }

}
