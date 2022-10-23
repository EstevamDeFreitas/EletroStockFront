import { Component, OnInit } from '@angular/core';
import { SaleService } from 'src/app/access/services/sale/sale.service';
import { SaleDTO, SaleStatus } from 'src/app/customer/models/saledto';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  public sales : SaleDTO[] = [];

  constructor(private saleService : SaleService) { }

  ngOnInit(): void {
    this.getAdminSales();
  }

  getAdminSales(){
    this.saleService.getAllSales().subscribe(res => {
      this.sales = res.data;
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

  changeStatus(saleId : string, value:SaleStatus){
    this.saleService.changeStatus(saleId, value).subscribe(res => {
      this.getAdminSales();
    })
  }

}
