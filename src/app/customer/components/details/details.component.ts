import { CustomValidators } from 'src/app/shared/custom-validators';
import { CustomerDTO } from './../../../access/models/custumerDTO.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  formAccount: FormGroup = new FormGroup({});
  customer: CustomerDTO = new CustomerDTO();
  edit: boolean = false;

  constructor(private formbuilder: FormBuilder, public datePipe: DatePipe) { }

  ngOnInit(): void {
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

}
