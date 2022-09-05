import { ValidatorFn } from '@angular/forms';
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
import { CustomerChangePasswordDTO } from 'src/app/access/models/customerChangePasswordDTO';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  formAccount: FormGroup = new FormGroup({});
  formPassword: FormGroup = new FormGroup({});
  customer: CustomerDTO = new CustomerDTO();
  customerPassword: CustomerChangePasswordDTO = new CustomerChangePasswordDTO();
  isEdit: boolean = false;
  isEditPassword: boolean = false;

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
      birthDate: [this.datePipe.transform(this.customer.birthDate, 'dd/MM/yyyy')],
      cpf: [this.customer.cpf],
      gender: [this.customer.gender]
    })

    this.formPassword = this.formbuilder.group({
      password: [''],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)]
      ],

      confirmNewPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        CustomValidators.matchPassword('newPassword', 'confirmNewPassword'),]
      ]
    })
  }

  createAddressForm(address : AdressDTO) {
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

  validationSaveBtn() {
    if (this.isEditPassword && this.isEdit) {
      if (this.formAccount.valid && this.formPassword.valid) {
        return true;
      } else {
        return false;
      }
    }
    else if (this.isEdit && !this.isEditPassword) {
      if (this.formAccount.valid) {
        return true;
      } else {
        return false
      }
    }
    else {
      return false;
    }
  }

  verifyPassword(password: any) {
    if (password == this.customer.password) {
      return true;
    } else {
      return false;
    }
  }

  saveEditAccount(formAccount: FormGroup, formPassword: FormGroup) {

    if (this.isEditPassword && this.isEdit) {
      if (formAccount.valid && formPassword.valid) {
        // edit account
        this.customer.name = formAccount.controls['name'].value;
        this.customer.phoneNumber = formAccount.controls['phone'].value;
        this.customerService.updateCustomer(this.customer).subscribe(res => {

        })

        // edit password
        this.customerPassword.currentPassword = formAccount.controls['password'].value;
        this.customerPassword.newPassword = formAccount.controls['confirmNewPassword'].value;
        this.customerService.changerPassowrd(this.customerPassword).subscribe(res2 => {

        })
        return true;

      } else {
        return false;

      }
    }
    else if (this.isEdit && !this.isEditPassword) {
      if (formAccount.valid) {

        this.customer.name = formAccount.controls['name'].value;
        this.customer.phoneNumber = formAccount.controls['phone'].value;
        this.customerService.updateCustomer(this.customer).subscribe(res => {

        })
        return true;

      } else {
        return false

      }
    }
    else {
      return false;
    }
  }

  cancelEditForm() {
    this.isEdit = false;
    this.isEditPassword = false;
  }

  editForm() {
    this.isEdit = true;
  }

  editPassword() {
    this.isEditPassword = true;
  }
}
