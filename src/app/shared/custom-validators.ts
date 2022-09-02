import { Injectable } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { of } from "rxjs";

// @Injectable({
//   providedIn: 'root'
// })

export class CustomValidators {

  static matchPassword(password: string, confirmPassword: string) {
    return (formControl: FormControl) => {

      if (!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }

      const passwordControl = (<FormGroup>formControl.root).get(password);
      const confirmPasswordControl = (<FormGroup>formControl.root).get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
        return;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
      return null;
    };
  }

}
