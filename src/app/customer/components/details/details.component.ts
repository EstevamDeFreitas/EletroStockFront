import { Response } from './../../../access/models/response';
import { CreditCardService } from './../../../access/services/credit-card/credit-card.service';
import { CreditCardDTO } from './../../../access/models/creditCardDTO.model';
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
import { CardFlagService } from 'src/app/access/services/card-flag/card-flag.service';
import { CardFlagDTO } from 'src/app/access/models/cardFlagDTO.model';



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  formAccount: FormGroup = new FormGroup({});
  formPassword: FormGroup = new FormGroup({});

  formCreditCards: FormGroup[] = [];
  formCreditCard: FormGroup = new FormGroup({});
  creditCard: CreditCardDTO[] = [];
  newCreditCard: CreditCardDTO = new CreditCardDTO();
  availableCardFlags : CardFlagDTO[] = [];
  cardFlag: CardFlagDTO = new CardFlagDTO();
  isCreditCardCreating: boolean = false;
  isCreditCardEdit: boolean = false;

  customer: CustomerDTO = new CustomerDTO();
  customerPassword: CustomerChangePasswordDTO = new CustomerChangePasswordDTO();
  isEdit: boolean = false;
  isEditPassword: boolean = false;

  formAddress : FormGroup = new FormGroup({});
  isAddressEditing : boolean = false;
  isAddressCreating : boolean = false;
  isCardCreating : boolean = false;
  isCardEditing : boolean = false;
  formAddresses : FormGroup[] = [];
  addressToEdit !: FormGroup;

  public stateList = StateList;

  isCustomerLoading : boolean = false;



  constructor(private formbuilder: FormBuilder, public datePipe: DatePipe,
    private customerService: CustumerService, private addressService: AddressService,
    public creditCardService: CreditCardService, private cardFlagService : CardFlagService) { }

  ngOnInit(): void {
    this.getCustomerInfo();
    this.getAvailablesCardFlags();
  }

  getAvailablesCardFlags(){
    this.cardFlagService.getAllCardFlags().subscribe({
      next: (res)=>{
        res.data.forEach(card => {
          let cardFlag = new CardFlagDTO();
          cardFlag = card;
          this.availableCardFlags.push(cardFlag);
        });

      }
    })
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

  setCardFlag() {
    this.newCreditCard.cardFlag = this.cardFlag.name;
    this.newCreditCard.cardFlagId = this.cardFlag.id;
  }

  createCreditCard(formCreditCard: FormGroup, ) {
    this.newCreditCard.ownerName = formCreditCard.controls['name'].value;
    this.newCreditCard.cardNumber = formCreditCard.controls['number'].value;
    this.newCreditCard.securityCode = formCreditCard.controls['cvc'].value;
    this.newCreditCard.customerId = AccessService.getUser()!;

    this.creditCardService.createCustomerCreditCard(this.newCreditCard).subscribe(res => {
      if(res.message == "Credit Card Created") {
        this.formCreditCard = new FormGroup({});
        this.newCreditCard = new CreditCardDTO();
        this.isCreditCardCreating = false;
        this.getCustomerInfo();
      }
    });
  }

  createCancel() {
    this.isCreditCardCreating = false;
    this.formCreditCard = new FormGroup({});
  }

  editCreditCard(i: number) {
    this.formCreditCards[i].controls['credtCardEdit'].setValue(true);
  }

  updateCreditCard(card: FormGroup) {
    this.newCreditCard.id = card.controls['id'].value;
    this.newCreditCard.ownerName = card.controls['name'].value;
    this.newCreditCard.cardNumber = card.controls['number'].value;
    this.newCreditCard.securityCode = card.controls['cvc'].value;
    this.newCreditCard.cardFlag = card.controls['cardFlag'].value;
    this.newCreditCard.cardFlagId = card.controls['cardFlagId'].value;
    this.newCreditCard.customerId = AccessService.getUser()!;
    this.creditCardService.updateCustomerCreditCard(this.newCreditCard).subscribe(res =>{
      if(res.message === "Credit Card Updated") {
        this.formCreditCard = new FormGroup({});
        this.newCreditCard = new CreditCardDTO();
        this.getCustomerInfo();
      }
    })
  }

  deleteCreditCard(card: FormGroup) {
    this.creditCardService.deleteCustomerCreditCard(card.controls['id'].value).subscribe(res => {
      if(res.message === "Credit Card Deleted") {
        this.formCreditCard = new FormGroup({});
        this.newCreditCard = new CreditCardDTO();
        this.getCustomerInfo();
      }
    })
  }

  createFormCreditCard(creditCard: CreditCardDTO) {
    return this.formbuilder.group({
      id: [creditCard.id],
      name: [creditCard.ownerName],
      number: [creditCard.cardNumber],
      expiry: [''],
      cvc: [creditCard.securityCode],
      cardFlag: [creditCard.cardFlag],
      cardFlagId: [creditCard.cardFlagId],
      credtCardEdit: [this.isCreditCardEdit]
    })
  }

  loadCreditCardList() {
    this.formCreditCards = [];
    this.customer.creditCards.forEach(creditCard => {
      this.formCreditCards.push(this.createFormCreditCard(creditCard))
    })
  }

  loadAddressFormList() {
    this.formAddresses = [];
    this.customer.addresses.forEach(address => {
      this.formAddresses.push(this.createAddressForm(address));
    });
  }

  getCustomerInfo() {
    this.isCustomerLoading = true;
    this.customerService.getCustomerDetail().subscribe(res => {
      this.customer = res.data;
      this.afterReceivingCustomerInfo();
      this.isCustomerLoading = false;
    });
  }

  afterReceivingCustomerInfo() {
    this.loadAddressFormList();
    this.createForm();
    this.loadCreditCardList();
  }

  activateCreateCreditCard() {
    if(!this.isCreditCardCreating) {
      this.isCreditCardCreating = true;
      this.formCreditCard = this.createFormCreditCard(new CreditCardDTO())
    }
  }

  activateCreateAddress() {
    if(!this.isAddressCreating){
      this.isAddressCreating = true;
      this.formAddress = this.createAddressForm(new AdressDTO());
    }
  }

  cancelAddressForm() {
    this.isAddressCreating = false;
    this.isAddressEditing = false;
  }

  createAddress() {
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
          this.isAddressCreating = false;
          this.getCustomerInfo();
        }
      })
    }

  }

  selectAddressToEdit(address : FormGroup) {
    this.addressToEdit = address;
  }

  EditAddress(address : FormGroup) {
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
        this.customerPassword.currentPassword = formPassword.controls['password'].value;
        this.customerPassword.newPassword = formPassword.controls['confirmNewPassword'].value;
        this.customerPassword.email = this.customer.email;
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
    this.isEditPassword = !this.isEditPassword;
  }
}
