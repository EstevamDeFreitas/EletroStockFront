import { AccessService } from './../../services/access/access.service';
import { LoginDTO } from './../../models/loginDTO.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: LoginDTO = new LoginDTO();

  constructor(private accessService: AccessService) { }

  ngOnInit(): void {
 
  }

  sendLogin() {
    this.accessService.loginCustomer(this.login).subscribe();
  }

}
