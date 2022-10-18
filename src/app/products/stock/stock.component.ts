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
  public addStock: boolean = false;

  constructor(private formBuilder: FormBuilder, private stockService: StockService) { }

  ngOnInit() {
    this.getStock();
  }

  getStock(){
    this.stockService.getStocks().subscribe(res => {
      console.log('getStock', res)
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
      inputDate: [stock.inputDate]
    })
  }

  addStocks(){
    this.stockForm = this.createForm(new StockDTO());
    this.addStock = true;
  }

  addNewStock(stock: FormGroup){
    this.stock.productId = stock.controls['productId'].value;
    this.stock.quantity = stock.controls['quantity'].value;
    this.stock.sourceName = stock.controls['sourceName'].value;
    this.stock.value = stock.controls['value'].value;
    this.stock.inputDate = stock.controls['inputDate'].value;

    console.log('create stock', this.stock);
    this.stockService.createStock(this.stock).subscribe(res => {
      this.stockForm = new FormGroup({});
      this.stock = new StockDTO();
      this.getStock();
    })


  }

}
