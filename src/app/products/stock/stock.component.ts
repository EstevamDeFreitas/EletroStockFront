import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StockDTO } from 'src/app/access/models/stockDTO.model';
import { StockService } from 'src/app/access/services/stock/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  public stock: StockDTO = new StockDTO();
  public stockForm: FormGroup = new FormGroup({});
  public stockFormList: FormGroup[] = [];
  public stockList: StockDTO[] = [];

  constructor(private formBuilder: FormBuilder, private stockService: StockService) { }

  ngOnInit() {
    this.getStock();
    this.stockFormList.push(this.createForm(this.stock));
    console.log(this.stockFormList[0].controls['product']);
  }

  getStock(){
    this.stockService.getStocks().subscribe(res => {
      if(res.message === 'Stocks Found'){
        res.data.forEach(stock => {
          this.stockFormList.push(this.createForm(stock))
        });
      }
    });
  }

  createForm(stock: StockDTO){
    return this.formBuilder.group({
      productId: [stock.productId],
      sourceName: [stock.sourceName],
      quantity: [stock.quantity],
      value: [stock.value],
      inputDate: [stock.inputDate],
      product: [stock.product],
      addStock: [false],
    })
  }

  addStocks(i: number){
    this.stockFormList[i].controls['addStock'].setValue(true);
  }

}
