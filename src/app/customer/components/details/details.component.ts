import { CustomValidators } from 'src/app/shared/custom-validators';
import { CustomerDTO } from './../../../access/models/custumerDTO.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AdressDTO } from 'src/app/access/models/adressDTO.model';
import { CustumerService } from 'src/app/access/services/custumer/custumer.service';
import { StateList } from 'src/app/shared/states';
import { AccessService } from 'src/app/access/services/access/access.service';
import { AddressService } from 'src/app/access/services/address/address.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  formAccount: FormGroup = new FormGroup({});
  customer: CustomerDTO = new CustomerDTO();
  edit: boolean = false;

  formAddress : FormGroup = new FormGroup({});
  isAddressEditing : boolean = false;
  isAddressCreating : boolean = false;

  public stateList = StateList;

  constructor(private formbuilder: FormBuilder, public datePipe: DatePipe, private customerService : CustumerService, private addressService: AddressService) { }

  ngOnInit(): void {
    this.getCustomerInfo();
    this.createForm();
  }

  createForm() {
    this.formAccount = this.formbuilder.group({
      name: [this.customer.name],
      phone: [this.customer.phoneNumber],
      password: [this.customer.password],
      birthDate: [this.datePipe.transform(this.customer.birthDate, 'dd/MM/yyyy')],
      cpf: [this.customer.cpf],
      gender: [this.customer.gender],
      newPassword: [''],
      confirmNewPassword: ['', [
        Validators.required,
        CustomValidators.matchPassword('newPassword', 'confirmNewPassword')]
      ]
    })
  }

  createAddressForm(address : AdressDTO){
    this.formAddress = this.formbuilder.group({
      addressType : [address.addressType, [Validators.required]],
      streetType: [address.streetType, [Validators.required]],
      description: [address.description],
      street: [address.street, [Validators.required]],
      number: [address.number, [Validators.required]],
      district: [address.district, [Validators.required]],
      CEP: [address.cep, [Validators.required, Validators.pattern('([0-9]{5})([0-9]{3})')]],
      city: [address.city, [Validators.required]],
      state: [address.state, [Validators.required]],
      country: [address.country, [Validators.required]]
    });
  }

  getCustomerInfo(){
    this.customerService.getCustomerDetail().subscribe(res => {
      this.customer = res.data;
      this.afterReceivingCustomerInfo();
    });
  }

  afterReceivingCustomerInfo(){

  }

  activateCreateAddress(){
    if(!this.isAddressCreating){
      this.isAddressCreating = true;
      this.createAddressForm(new AdressDTO());
    }
  }

  cancelAddressForm(){
    this.isAddressCreating = false;
    this.isAddressEditing = false;
  }

  createAddress(){
    let newAddress = new AdressDTO();

    //TODO adicionar validação

    if(this.formAddress.valid){
      newAddress.addressType = this.formAddress.controls['addressType'].value;
      newAddress.streetType = this.formAddress.controls['streetType'].value;
      newAddress.cep = this.formAddress.controls['CEP'].value;
      newAddress.city = this.formAddress.controls['city'].value;
      newAddress.country = this.formAddress.controls['country'].value;
      newAddress.description = this.formAddress.controls['description'].value;
      newAddress.district = this.formAddress.controls['district'].value;
      newAddress.number = this.formAddress.controls['number'].value;
      newAddress.state = this.formAddress.controls['state'].value;
      newAddress.street = this.formAddress.controls['street'].value;
      newAddress.customerId = AccessService.getUser()!;

      this.addressService.createAddress(newAddress).subscribe({
        next:(res)=>{

        },
        error:(err)=>{

        }
      });
    }
    else{
      console.log(this.formAddress.errors);

    }

  }


}
