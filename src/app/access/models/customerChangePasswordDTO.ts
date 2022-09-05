export class CustomerChangePasswordDTO {

  public email: string;
  public currentPassword: string;
  public newPassword: string;

  constructor() {
    this.email = '';
    this.currentPassword = '';
    this.newPassword = '';
  }

}
