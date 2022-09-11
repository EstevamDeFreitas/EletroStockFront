import { Response } from './../../../access/models/response';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CardFlagDTO } from 'src/app/access/models/cardFlagDTO.model';
import { CardFlagService } from 'src/app/access/services/card-flag/card-flag.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-flag',
  templateUrl: './card-flag.component.html',
  styleUrls: ['./card-flag.component.scss']
})
export class CardFlagComponent implements OnInit {

  public cardFlag: CardFlagDTO = new CardFlagDTO();
  public formCardFlagList: FormGroup[] = [];
  public formCardFlag: FormGroup = new FormGroup({});
  public isCardFlagCreate = false;
  public isCardFlagEdit = false;

  constructor(private cardFlagService: CardFlagService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getAllCardFlag();
  }

  getAllCardFlag() {
    this.formCardFlagList = [];
    this.cardFlagService.getAllCardFlags().subscribe(res =>{
      console.log('getall', res);
      if (res.message == 'Card Flags Found') {
        res.data.forEach(card =>{
          this.formCardFlagList.push(this.createCreditFlagForm(card))
        })
      }
    })
  }

  createCreditFlagForm(cardFlag: CardFlagDTO) {
    return this.formBuilder.group({
      id: [cardFlag.id],
      name: [cardFlag.name],
      cardFlagEdit: [this.isCardFlagEdit]
    })
  }

  newFlag() {
    this.isCardFlagCreate = true;
    this.cardFlag = new CardFlagDTO();
    this.formCardFlag = this.createCreditFlagForm(this.cardFlag);
  }

  editCardFlag(i: number) {
    this.formCardFlagList[i].controls['cardFlagEdit'].setValue(true);
  }


  createCreditCardFlag(credidCardFlag: FormGroup) {
    this.cardFlag.name = credidCardFlag.controls['name'].value;
    this.cardFlagService.createCardFlag(JSON.stringify(this.cardFlag.name)).subscribe(res => {
      if(res.message = 'Card Flags Created') {
        this.isCardFlagCreate = false;
        this.getAllCardFlag();
      }
    })
  }

  updateCardFlag(cardFlag: FormGroup) {
    this.cardFlag.id = cardFlag.controls['id'].value;
    this.cardFlag.name = cardFlag.controls['name'].value;
    this.cardFlagService.updateCardFlag(this.cardFlag).subscribe(res => {})
  }

  deleteCardFlag(cardFlag: FormGroup) {
    this.cardFlag.id = cardFlag.controls['id'].value;
    this.cardFlagService.deleteCardFlag(this.cardFlag.id).subscribe(res => {
      if(res.message == "Card Flag Deleted") {
        this.getAllCardFlag();
      }
    })
  }

}
