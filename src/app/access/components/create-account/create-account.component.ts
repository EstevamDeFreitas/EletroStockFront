import { Component, OnInit } from '@angular/core';
import { CustomerDTO } from '../../models/custumerDTO.model';
import { CustumerService } from '../../services/custumer/custumer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/custom-validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  logForm: FormGroup = new FormGroup({});
  custForm: FormGroup = new FormGroup({});
  customerDTO: CustomerDTO = new CustomerDTO();
  confirmPassword: string = "";
  step = 1;

  constructor(private customerService: CustumerService, private formBuilder: FormBuilder,
              private router:Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.logForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      confirmPassword: [this.confirmPassword, [
        Validators.required, Validators.minLength(8),
        Validators.maxLength(20),
        CustomValidators.matchPassword('password', 'confirmPassword')]
      ]
    });

    this.custForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      gender: ['', Validators.required],
      phoneNumber: ['', Validators.pattern('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})')],
      cpf: ['', [Validators.required, Validators.pattern(/^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/)]],
      birthDate: ['', [Validators.required]]
    })
  }

  logFormValidate(logForm: FormGroup) {

    this.customerDTO.email = logForm.controls['email'].value;
    this.customerDTO.password = logForm.controls['password'].value;

    this.step++
  }

  createAccount(custForm: FormGroup) {

    this.customerDTO.name = custForm.controls['name'].value;
    this.customerDTO.cpf = custForm.controls['cpf'].value;
    this.customerDTO.birthDate = custForm.controls['birthDate'].value;
    this.customerDTO.gender = custForm.controls['gender'].value;
    console.log(this.customerDTO)

    this.customerService.createCustomer(this.customerDTO).subscribe(res => {
      this.redirectLogin();
    });
  }

  redirectLogin() {
    this.router.navigate(['/login']);
  }
}
