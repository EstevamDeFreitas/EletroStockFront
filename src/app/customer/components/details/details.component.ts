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
  formAddresses : FormGroup[] = [];
  addressToEdit !: FormGroup;

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
    return this.formbuilder.group({
      id : [address.id, [Validators.required]],
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

  loadAddressFormList(){
    this.formAddresses = [];
    this.customer.addresses.forEach(address => {
      this.formAddresses.push(this.createAddressForm(address));
    });
  }

  getCustomerInfo(){
    this.customerService.getCustomerDetail().subscribe(res => {
      this.customer = res.data;
      this.afterReceivingCustomerInfo();
    });
  }

  afterReceivingCustomerInfo(){
    this.loadAddressFormList();
  }

  activateCreateAddress(){
    if(!this.isAddressCreating){
      this.isAddressCreating = true;
      this.formAddress = this.createAddressForm(new AdressDTO());
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
          this.cancelAddressForm();
          this.getCustomerInfo();

        },
        error:(err)=>{

        }
      });
    }
    else{
      console.log(this.formAddress.errors);

    }

  }

  selectAddressToEdit(address : FormGroup){
    this.addressToEdit = address;
  }

  EditAddress(address : FormGroup){
    let editAddress = new AdressDTO();

    //TODO adicionar validação

    if(address.valid){
      editAddress.id = address.controls['id'].value;
      editAddress.addressType = address.controls['addressType'].value;
      editAddress.streetType = address.controls['streetType'].value;
      editAddress.cep = address.controls['CEP'].value;
      editAddress.city = address.controls['city'].value;
      editAddress.country = address.controls['country'].value;
      editAddress.description = address.controls['description'].value;
      editAddress.district = address.controls['district'].value;
      editAddress.number = address.controls['number'].value;
      editAddress.state = address.controls['state'].value;
      editAddress.street = address.controls['street'].value;
      editAddress.customerId = AccessService.getUser()!;

      this.addressService.updateAddress(editAddress).subscribe({
        next:(res)=>{
          this.getCustomerInfo();
        },
        error:(err)=>{

        }
      });
    }
    else{
      console.log(this.formAddress.errors);

    }
  }

  cancelEditAddress(address : FormGroup){
    this.addressToEdit = new FormGroup({});
    let index = this.formAddresses.findIndex(x => x.controls['id'].value == address.controls['id'].value);
    this.formAddresses[index] = this.createAddressForm(this.customer.addresses.find(x => x.id == address.controls['id'].value)!);
  }

  updateCustomerAccount(){
    this.customerService.updateCustomerAccountDetails(this.customer.customerAccount).subscribe({
      next:(res)=>{
        this.getCustomerInfo();
      },
      error:(err)=>{

      }
    });
  }

  isAddressBeingEdited(address : FormGroup){
    return address == this.addressToEdit;
  }

  setChargeAddress(id : string){
    if(this.customer.customerAccount.defaultChargeAddressId == id){
      this.customer.customerAccount.defaultChargeAddressId = undefined;
    }
    else{
      this.customer.customerAccount.defaultChargeAddressId = id;
    }

    this.updateCustomerAccount();
  }

  setDeliveryAddress(id : string){
    if(this.customer.customerAccount.defaultDeliveryAddressId == id){
      this.customer.customerAccount.defaultDeliveryAddressId = undefined;
    }
    else{
      this.customer.customerAccount.defaultDeliveryAddressId = id;
    }

    this.updateCustomerAccount();
  }

  deleteAddress(id : string){
    this.addressService.deleteAddress(id).subscribe({
      next:(res)=>{
        this.getCustomerInfo();
      },
      error:(err)=>{

      }
    });
  }


}
