import { Component, OnInit } from '@angular/core';
import { SaleService } from 'src/app/access/services/sale/sale.service';
import { SaleDTO } from '../../models/saledto';

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
    }

    return stringValue;
  }

  requestRefund(){

  }

}
